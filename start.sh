#!/bin/bash
python -c "import nltk;
nltk.download('punkt')"
cd backend 
python app.py
