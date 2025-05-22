#!/bin/bash
python -c "import nltk;
nltk.download('pnkt')"
cd backend 
python app.py
