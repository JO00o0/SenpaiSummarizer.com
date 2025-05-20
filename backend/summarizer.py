def summarize_text(text):
    """
    هذه دالة بسيطة تأخذ أول 3 جمل فقط من النص.
    يمكنك تطويرها لاحقًا باستخدام NLP أو GPT.
    """
    import re
    sentences = re.split(r'[.!؟]\s*', text)
    # Filter out empty strings that may result from splitting
    sentences = [s for s in sentences if s.strip()]
    summary = '. '.join(sentences[:3])
    if summary and not summary.endswith('.'): # Add a period if the summary is not empty and doesn't end with one.
        summary += '.'
    return summary

