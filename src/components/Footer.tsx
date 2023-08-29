import * as React from 'react';

export function Footer() {
  return (
    <footer className="horror-footer">
      <p>© {new Date().getFullYear()} Horror App. Powered by OpenAI.</p>
    </footer>
  );
}

export default Footer;
