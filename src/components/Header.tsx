const Header = () => {
  return (
    <header className="horror-header">
      <h1 className="horror-title">Welcome to your daily horror story</h1>
      <div style={{ display: 'none' }}>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="squiggly-0">
              <feTurbulence
                id="turbulence"
                baseFrequency="0.02"
                numOctaves="3"
                result="noise"
                seed="0"
              />
              <feDisplacementMap
                id="displacement"
                in="SourceGraphic"
                in2="noise"
                scale="6"
              />
            </filter>
            <filter id="squiggly-1">
              <feTurbulence
                id="turbulence"
                baseFrequency="0.02"
                numOctaves="3"
                result="noise"
                seed="1"
              />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
            </filter>
          </defs>
        </svg>
      </div>
    </header>
  );
};

export default Header;
