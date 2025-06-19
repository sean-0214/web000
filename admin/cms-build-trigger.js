// Script to trigger Netlify build after CMS content updates
(function() {
  // Listen for successful content changes in CMS
  if (window.CMS) {
    window.CMS.registerEventListener({
      name: 'postPublish',
      handler: function() {
        console.log('Content published, triggering site rebuild...');
        // Trigger Netlify build hook
        fetch('https://api.netlify.com/build_hooks/6853c99144dae31570f53c0a', {
          method: 'POST',
          body: JSON.stringify({})
        })
        .then(response => {
          if (response.ok) {
            console.log('Build triggered successfully!');
            // Show notification to user
            const notification = document.createElement('div');
            notification.style.position = 'fixed';
            notification.style.bottom = '20px';
            notification.style.right = '20px';
            notification.style.padding = '15px 20px';
            notification.style.backgroundColor = '#43a047';
            notification.style.color = 'white';
            notification.style.borderRadius = '4px';
            notification.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
            notification.style.zIndex = '9999';
            notification.style.transition = 'opacity 0.5s ease-in-out';
            notification.innerHTML = 'Content published! Site is rebuilding (this may take a minute)...';
            
            document.body.appendChild(notification);
            
            // Remove notification after 8 seconds
            setTimeout(() => {
              notification.style.opacity = '0';
              setTimeout(() => document.body.removeChild(notification), 500);
            }, 8000);
          } else {
            console.error('Failed to trigger build:', response.statusText);
          }
        })
        .catch(error => {
          console.error('Error triggering build:', error);
        });
      }
    });
    console.log('CMS build trigger installed successfully.');
  } else {
    console.error('CMS not found, could not install build trigger.');
  }
})();
