import os

# Get the current directory
current_directory = os.path.dirname(os.path.abspath(__file__))

# Get the list of all files in the current directory
files_in_directory = [f for f in os.listdir(current_directory) if os.path.isfile(os.path.join(current_directory, f))]
print(files_in_directory)
# Print the list of files
# for file in files_in_directory:
#     print(file)