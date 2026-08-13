document.addEventListener('DOMContentLoaded', () => {
  const copyBtn = document.getElementById('copyEmailBtn');
  const email = 'heeyoung4861@gmail.com';

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(email).then(() => {
      alert('이메일 주소가 클립보드에 복사되었습니다: ' + email);
    }).catch(err => {
      console.error('복사 실패:', err);
    });
  });
});