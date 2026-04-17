# Use the official Python 3.10.9 image
FROM python:3.10.9

# Set the working directory
WORKDIR /app

# Copy requirements first for better caching
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Copy the application files
COPY . .

# Expose port 5000 for the Flask app
EXPOSE 5000

# Start the Flask app with Gunicorn (production WSGI server)
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "4", "--timeout", "120", "app:app"]
