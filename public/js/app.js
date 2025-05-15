document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Initialize tabs
  initTabs();
  
  // Initialize forms
  initForms();
  
  // Check key status
  checkKeyStatus();
  
  // Initialize clipboard buttons
  initClipboardButtons();
});

// Tab functionality
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      
      // Remove active class from all tabs
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      // Add active class to selected tab
      btn.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  // Also handle tab switching from other elements
  document.querySelectorAll('.switch-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      document.querySelector(`.tab-btn[data-tab="${tabId}"]`).click();
    });
  });
}

// Check if keys exist
async function checkKeyStatus() {
  try {
    const response = await fetch('/api/keys/status');
    const data = await response.json();
    
    document.getElementById('key-status-loading').style.display = 'none';
    
    if (data.exists) {
      document.getElementById('key-exists').style.display = 'block';
      document.getElementById('public-key-display').textContent = data.publicKey;
      document.getElementById('decrypt-warning').style.display = 'none';
    } else {
      document.getElementById('no-keys').style.display = 'block';
      document.getElementById('decrypt-warning').style.display = 'block';
    }
  } catch (error) {
    showNotification('Error checking key status: ' + error.message, 'error');
    document.getElementById('key-status-loading').style.display = 'none';
    document.getElementById('no-keys').style.display = 'block';
  }
}

// Initialize forms
function initForms() {
  // Generate keys form
  const generateKeysForm = document.getElementById('generate-keys-form');
  if (generateKeysForm) {
    generateKeysForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        passphrase: document.getElementById('passphrase').value
      };
      
      try {
        const response = await fetch('/api/keys/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
          showNotification('Keys generated successfully!', 'success');
          document.getElementById('no-keys').style.display = 'none';
          document.getElementById('key-exists').style.display = 'block';
          document.getElementById('public-key-display').textContent = data.publicKey;
          document.getElementById('decrypt-warning').style.display = 'none';
          
          // Clear the form
          generateKeysForm.reset();
        } else {
          showNotification('Error: ' + data.error, 'error');
        }
      } catch (error) {
        showNotification('Error generating keys: ' + error.message, 'error');
      }
    });
  }
  
  // Encrypt form
  const encryptForm = document.getElementById('encrypt-form');
  if (encryptForm) {
    encryptForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = {
        message: document.getElementById('message').value,
        recipientPublicKey: document.getElementById('recipient-key').value
      };
      
      try {
        const response = await fetch('/api/encrypt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
          document.getElementById('encrypted-message-display').textContent = data.encryptedMessage;
          document.getElementById('encrypted-result').style.display = 'block';
          showNotification('Message encrypted successfully!', 'success');
        } else {
          showNotification('Error: ' + data.error, 'error');
        }
      } catch (error) {
        showNotification('Error encrypting message: ' + error.message, 'error');
      }
    });
  }
  
  // Decrypt form
  const decryptForm = document.getElementById('decrypt-form');
  if (decryptForm) {
    decryptForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = {
        encryptedMessage: document.getElementById('encrypted-message').value,
        passphrase: document.getElementById('decrypt-passphrase').value
      };
      
      try {
        const response = await fetch('/api/decrypt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
          document.getElementById('decrypted-message-display').textContent = data.decryptedMessage;
          document.getElementById('decrypted-result').style.display = 'block';
          showNotification('Message decrypted successfully!', 'success');
        } else {
          showNotification('Error: ' + data.error, 'error');
        }
      } catch (error) {
        showNotification('Error decrypting message: ' + error.message, 'error');
      }
    });
  }
}

// Initialize clipboard buttons
function initClipboardButtons() {
  // Copy public key
  const copyKeyBtn = document.getElementById('copy-key');
  if (copyKeyBtn) {
    copyKeyBtn.addEventListener('click', () => {
      const publicKey = document.getElementById('public-key-display').textContent;
      copyToClipboard(publicKey, 'Public key copied to clipboard!');
    });
  }
  
  // Copy encrypted message
  const copyEncryptedBtn = document.getElementById('copy-encrypted');
  if (copyEncryptedBtn) {
    copyEncryptedBtn.addEventListener('click', () => {
      const encryptedMessage = document.getElementById('encrypted-message-display').textContent;
      copyToClipboard(encryptedMessage, 'Encrypted message copied to clipboard!');
    });
  }
}

// Copy to clipboard utility
function copyToClipboard(text, successMessage) {
  navigator.clipboard.writeText(text)
    .then(() => {
      showNotification(successMessage, 'success');
    })
    .catch(err => {
      showNotification('Failed to copy to clipboard: ' + err.message, 'error');
    });
}

// Show notification
function showNotification(message, type = 'success') {
  const notification = document.getElementById('notification');
  const notificationIcon = document.getElementById('notification-icon');
  const notificationMessage = document.getElementById('notification-message');
  
  // Set icon based on type
  if (type === 'success') {
    notification.classList.add('success');
    notification.classList.remove('error');
    notificationIcon.className = 'fas fa-check-circle';
  } else {
    notification.classList.add('error');
    notification.classList.remove('success');
    notificationIcon.className = 'fas fa-exclamation-circle';
  }
  
  // Set message
  notificationMessage.textContent = message;
  
  // Show notification
  notification.classList.add('show');
  
  // Hide after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
} 