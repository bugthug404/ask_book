import json

with open('data1.py', 'r') as f:
    lines = f.readlines()

# Add a comma at the end of each line except the last one
lines = [line.strip() + ',' for line in lines[:-1]] + [lines[-1].strip()]

# Join all lines and wrap in square brackets
formatted_data = '[' + ''.join(lines) + ']'

# Parse the string as JSON to check if it's valid
try:
    json.loads(formatted_data)
    print("The data is valid JSON.")
except json.JSONDecodeError:
    print("The data is not valid JSON.")

# If the data is valid, write it back to the file
if json.loads(formatted_data):
    with open('data1.py', 'w') as f:
        f.write(formatted_data)