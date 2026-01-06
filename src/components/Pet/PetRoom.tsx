import React, { useState } from 'react';
import './PetRoom.css';

interface InteractionButton {
  id: string;
  icon: string; // image filename
  action: string;
  animation: string;
}

const interactionButtons: InteractionButton[] = [
  { id: 'brush', icon: 'brush.png', action: 'brush', animation: 'happy' },
  { id: 'ball', icon: 'ball.png', action: 'play', animation: 'excited' },
  { id: 'can', icon: 'can.png', action: 'feed', animation: 'hungry' },
];

export const PetRoom: React.FC = () => {
  const [currentAnimation, setCurrentAnimation] = useState<string>('neutral');
  const [isPetAnimating, setIsPetAnimating] = useState(false);

  const handleInteraction = (animation: string) => {
    setIsPetAnimating(true);
    setCurrentAnimation(animation);
    
    // Reset animation after 2 seconds
    setTimeout(() => {
      setIsPetAnimating(false);
      setCurrentAnimation('neutral');
    }, 2000);
  };

  return (
    <div className="pet-room">
      {/* Background */}
      <div className="pet-room__background">
        <img src="/images/electric_chicken_background.png" alt="Room Background" />
        
        {/* Interaction Buttons */}
        <div className="pet-room__controls">
          {interactionButtons.map((button) => (
            <button
              key={button.id}
              className="pet-room__control-btn"
              onClick={() => handleInteraction(button.animation)}
            >
              <img src={`/images/${button.icon}`} alt={button.action} />
            </button>
          ))}
        </div>

        {/* Pet Character */}
        <div className={`pet-room__pet ${isPetAnimating ? 'animating' : ''}`}>
          <img src="/images/dog.png" alt="Pet" />
          {isPetAnimating && (
            <div className="pet-room__pet-reaction">
              {currentAnimation === 'happy' && '💖'}
              {currentAnimation === 'excited' && '✨'}
              {currentAnimation === 'hungry' && '🤤'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
