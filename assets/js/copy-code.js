document.addEventListener('DOMContentLoaded', function() {
  // Find all code blocks
  const codeBlocks = document.querySelectorAll('pre');

  codeBlocks.forEach(function(codeBlock) {
    // Create wrapper div
    const wrapper = document.createElement('div');
    wrapper.className = 'code-header';
    codeBlock.parentNode.insertBefore(wrapper, codeBlock);
    wrapper.appendChild(codeBlock);

    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-code-button';
    copyButton.textContent = 'Copy';

    // Insert button
    wrapper.insertBefore(copyButton, codeBlock);

    // Add click event
    copyButton.addEventListener('click', function() {
      const code = codeBlock.querySelector('code');
      const text = code ? code.textContent : codeBlock.textContent;

      navigator.clipboard.writeText(text).then(function() {
        copyButton.textContent = 'Copied!';
        copyButton.classList.add('copied');

        setTimeout(function() {
          copyButton.textContent = 'Copy';
          copyButton.classList.remove('copied');
        }, 2000);
      }).catch(function(err) {
        console.error('Failed to copy:', err);
      });
    });
  });
});
