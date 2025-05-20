document.addEventListener("DOMContentLoaded", function() {
  const summarizeBtn = document.getElementById("summarize-btn");
  const lessonText = document.getElementById("lesson-text");
  const summaryResult = document.getElementById("summary-result");

  if (summarizeBtn) {
    summarizeBtn.addEventListener("click", async function() {
      const text = lessonText.value;
      if (!text.trim()) {
        summaryResult.innerHTML = "<p class='error'>الرجاء إدخال نص للتلخيص</p>";
        return;
      }

      summaryResult.innerHTML = "<p>جاري التلخيص...</p>";
      
      try {
        const response = await fetch("/summarize", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        });

        const data = await response.json();
        
        if (response.ok) {
          summaryResult.innerHTML = `
            <h3>ملخص الدرس:</h3>
            <p>${data.summary}</p>
          `;
        } else {
          summaryResult.innerHTML = `<p class='error'>حدث خطأ: ${data.error}</p>`;
        }
      } catch (error) {
        summaryResult.innerHTML = `<p class='error'>حدث خطأ في الاتصال بالخادم</p>`;
        console.error("Error:", error);
      }
    });
  }
});
