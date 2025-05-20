import { summarizeBtn, lessonText, summaryResult } from "./main.js"; // Ensure .js extension for browser modules

if (summarizeBtn && lessonText && summaryResult) { // Check if elements exist
    summarizeBtn.addEventListener("click", () => {
        const inputText = lessonText.value.trim();
        if (!inputText) {
            summaryResult.textContent = "من فضلك اكتب الدرس.";
            return;
        }

        summaryResult.textContent = "جاري التلخيص..."; // Provide feedback

        // Call backend for summarization
        fetch("/summarize", { // Corrected endpoint, assuming Flask runs on the same origin
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: inputText })
        })
        .then(response => {
            if (!response.ok) {
                // Try to get error message from backend if available
                return response.json().then(errData => {
                    throw new Error(errData.error || `خطأ في الشبكة: ${response.status}`);
                }).catch(() => {
                    // Fallback if response.json() fails or no error message
                    throw new Error(`خطأ في الشبكة: ${response.status}`);
                });
            }
            return response.json();
        })
        .then(data => {
            if (data.summary) {
                summaryResult.innerHTML = `<strong>الملخص:</strong><br>${data.summary}`;

                // Save to localStorage
                const savedSummaries = JSON.parse(localStorage.getItem("summaries") || "[]");
                savedSummaries.push({ lesson: inputText, summary: data.summary });
                localStorage.setItem("summaries", JSON.stringify(savedSummaries));

                lessonText.value = ""; // Clear the textarea
            } else if (data.error) {
                summaryResult.textContent = `خطأ: ${data.error}`;
            } else {
                summaryResult.textContent = "حدث خطأ غير متوقع أثناء التلخيص.";
            }
        })
        .catch(error => {
            console.error("Error during summarization:", error);
            summaryResult.textContent = `حدث خطأ: ${error.message}`;
        });
    });
} else {
    console.error("One or more elements (summarizeBtn, lessonText, summaryResult) not found in the DOM. Check main.js and lesson_input.html");
}

// The other functions (toggleTheme, the other summarize, uploadImage) were removed 
// as they seemed unused or conflicting with the primary functionality of lesson_input.html.
// If they are needed, please clarify their purpose and where they should be used.

