document.addEventListener('DOMContentLoaded', () => {
    // Add copy buttons to all code blocks
    document.querySelectorAll('pre').forEach((codeBlock) => {
      const button = document.createElement('button');
      button.className = 'copy-code-button';
      button.textContent = 'Copy';
  
      // Append the button to the code block
      codeBlock.style.position = 'relative'; // Ensure relative positioning
      button.style.position = 'absolute';
      button.style.top = '10px';
      button.style.right = '10px';
  
      codeBlock.appendChild(button);
  
      // Add copy functionality
      button.addEventListener('click', async () => {
        const code = codeBlock.querySelector('code').innerText;
        try {
          await navigator.clipboard.writeText(code);
          button.textContent = 'Copied!';
          setTimeout(() => {
            button.textContent = 'Copy';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy text: ', err);
          button.textContent = 'Error';
          setTimeout(() => {
            button.textContent = 'Copy';
          }, 2000);
        }
      });
    });
  });
  