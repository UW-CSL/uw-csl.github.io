const accessForm = document.querySelector('#access-form');
const accessScreen = document.querySelector('#access-screen');
const siteContent = document.querySelector('#site-content');
const accessError = document.querySelector('#access-error');
const passwordToggle = document.querySelector('#password-toggle');
const accessCodeInput = document.querySelector('#access-code');
const accessCode = 'john.d.lee';

function grantAccess() {
  accessScreen.hidden = true;
  siteContent.hidden = false;
}

if (sessionStorage.getItem('csl-live-works-access') === 'granted') {
  grantAccess();
}

passwordToggle.addEventListener('click', () => {
  const shouldShow = accessCodeInput.type === 'password';
  accessCodeInput.type = shouldShow ? 'text' : 'password';
  passwordToggle.setAttribute('aria-pressed', String(shouldShow));
});

accessForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const submittedCode = String(new FormData(accessForm).get('access-code')).trim();

  if (!submittedCode) {
    accessError.textContent = 'Enter the access code to continue.';
    accessCodeInput.focus();
    return;
  }

  if (submittedCode === accessCode) {
    sessionStorage.setItem('csl-live-works-access', 'granted');
    grantAccess();
    return;
  }

  accessError.textContent = 'That access code is not recognized. Please try again.';
  accessForm.reset();
  accessCodeInput.focus();
});
