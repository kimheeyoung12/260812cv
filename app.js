document.addEventListener('DOMContentLoaded', () => {
  const copyBtn = document.getElementById('copyEmailBtn');
  const email = 'heeyoung4861@gmail.com';

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      // 최신 클립보드 API 사용
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          alert('이메일 주소가 클립보드에 복사되었습니다:\n' + email);
        }).catch(err => {
          console.error('복사 실패:', err);
          // 실패 시 구식 방법으로 시도하거나 대안 안내
          fallbackCopyTextToClipboard(email);
        });
      } else {
        // 클립보드 API를 지원하지 않는 경우
        fallbackCopyTextToClipboard(email);
      }
    });
  }
});

// 구형 브라우저를 위한 복사 폴백 함수
function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  
  // 화면 밖에 배치
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";
  
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    if (successful) {
      alert('이메일 주소가 클립보드에 복사되었습니다:\n' + text);
    } else {
      alert('복사에 실패했습니다. 이메일 주소를 직접 복사해주세요:\n' + text);
    }
  } catch (err) {
    console.error('폴백 복사 실패:', err);
    alert('복사에 실패했습니다. 이메일 주소를 직접 복사해주세요:\n' + text);
  }

  document.body.removeChild(textArea);
}