import React, { useEffect, useRef, useMemo, useState } from 'react';
import Matter from 'matter-js';
import { CartItem } from '../../types';
import './BasketVisualizer.css';

interface BasketVisualizerProps {
  cartItems: CartItem[];
}

export const BasketVisualizer: React.FC<BasketVisualizerProps> = ({ cartItems }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const bodiesRef = useRef<Map<string, Matter.Body>>(new Map());
  const [engineReady, setEngineReady] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Create a serialized key for cart items to detect changes
  const cartItemsKey = useMemo(() => {
    return cartItems
      .map(item => `${item.product.id}:${item.quantity}`)
      .sort()
      .join('|');
  }, [cartItems]);

  // Initialize physics engine
  useEffect(() => {
    if (!sceneRef.current) return;

    const width = sceneRef.current.offsetWidth;
    const height = 200;

    // Create engine
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 1 }
    });
    engineRef.current = engine;

    // Create renderer
    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent',
        pixelRatio: window.devicePixelRatio,
      },
    });
    renderRef.current = render;

    // Create boundaries
    const wallThickness = 50;
    const walls = [
      // Bottom
      Matter.Bodies.rectangle(width / 2, height + 25, width, wallThickness, { 
        isStatic: true,
        render: { 
          fillStyle: 'transparent',
          strokeStyle: '#FF9966',
          lineWidth: 3
        }
      }),
      // Left
      Matter.Bodies.rectangle(-25, height / 2, wallThickness, height, { 
        isStatic: true,
        render: { 
          fillStyle: 'transparent',
          strokeStyle: '#FF9966',
          lineWidth: 3
        }
      }),
      // Right
      Matter.Bodies.rectangle(width + 25, height / 2, wallThickness, height, { 
        isStatic: true,
        render: { 
          fillStyle: 'transparent',
          strokeStyle: '#FF9966',
          lineWidth: 3
        }
      }),
    ];

    Matter.Composite.add(engine.world, walls);

    // Add mouse control for dragging
    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    Matter.Composite.add(engine.world, mouseConstraint);

    // Keep the mouse in sync with rendering
    render.mouse = mouse;

    // Run the engine and renderer
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    // Mark engine as ready
    setEngineReady(true);

    // Cleanup
    return () => {
      setEngineReady(false);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      Matter.World.clear(engine.world, false);
      if (render.canvas) {
        render.canvas.remove();
      }
      render.textures = {};
    };
  }, []);

  // Update physics bodies when cart items change
  useEffect(() => {
    if (!engineRef.current || !sceneRef.current || !engineReady) return;

    const width = sceneRef.current.offsetWidth;
    const currentBodies = bodiesRef.current;
    const newBodyIds = new Set<string>();

    // Create or update bodies for each item
    cartItems.forEach((cartItem) => {
      for (let i = 0; i < cartItem.quantity; i++) {
        const uniqueId = `${cartItem.product.id}-${i}`;
        newBodyIds.add(uniqueId);
        
        // Check if body already exists
        if (!currentBodies.has(uniqueId)) {
          // Create new body with random position
          const x = 100 + Math.random() * Math.max(50, width - 200);
          const y = -100 - i * 40; // Drop from above
          const size = 40;
          
          const body = Matter.Bodies.circle(x, y, size / 2, {
            restitution: 0.5,
            friction: 0.3,
            density: 0.002,
            render: {
              fillStyle: 'transparent',
              strokeStyle: 'transparent',
              lineWidth: 0
            }
          });
          
          // Add custom property to store image
          (body as any).productImage = cartItem.product.images[0];
          
          Matter.Composite.add(engineRef.current!.world, body);
          currentBodies.set(uniqueId, body);
        }
      }
    });

    // Remove bodies that are no longer in cart
    currentBodies.forEach((body, id) => {
      if (!newBodyIds.has(id)) {
        Matter.Composite.remove(engineRef.current!.world, body);
        currentBodies.delete(id);
      }
    });

  }, [cartItemsKey, cartItems, engineReady]);

  // Custom rendering for product images
  useEffect(() => {
    if (!renderRef.current || !engineRef.current) return;

    const render = renderRef.current;
    const engine = engineRef.current;
    const context = render.context;

    // Override the afterRender to draw custom images
    Matter.Events.on(render, 'afterRender', () => {
      const bodies = Matter.Composite.allBodies(engine.world);
      
      bodies.forEach((body) => {
        const imageUrl = (body as any).productImage;
        if (imageUrl && context) {
          const img = new Image();
          img.src = imageUrl;
          
          context.save();
          context.translate(body.position.x, body.position.y);
          context.rotate(body.angle);
          
          const size = 40;
          context.drawImage(img, -size / 2, -size / 2, size, size);
          
          context.restore();
        }
      });
    });

    return () => {
      Matter.Events.off(render, 'afterRender');
    };
  }, []);

  return (
    <div className="basket-visualizer">
      <div className="basket-visualizer__container">
        {/* Physics Scene */}
        <div 
          ref={sceneRef} 
          className="basket-visualizer__scene"
        />

        {/* Pet Character */}
        <div className="basket-visualizer__pet">
          <img src="/images/dog.png" alt="Pet" />
          {totalItems > 0 && (
            <div className="basket-visualizer__pet-reaction">
              {totalItems > 5 ? '😍' : '😊'}
            </div>
          )}
        </div>

        {/* Item Count Badge */}
        {totalItems > 0 && (
          <div className="basket-visualizer__count-badge">
            {totalItems}
          </div>
        )}
      </div>
    </div>
  );
};
