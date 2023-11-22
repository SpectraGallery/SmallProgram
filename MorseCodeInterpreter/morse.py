import tkinter as tk
from tkinter import scrolledtext

# Define the mapping of English characters to Morse code
morse_dict = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..',
    '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
    '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----'
}

# Define Text Conversion

def text_to_morse(text):
    morse_text =''
    for char in text.upper():
        if char ==' ':
            morse_text += ' / '
        else:
            morse_text += morse_dict.get(char, '') + ' '
    
    return morse_text


def morse_to_text(morse):
    text =''
    morse_chars = morse.split(' ')
    for morse_char in morse_chars:
        if morse_char =='/':
            text += ' '
        else:
            text += get_key(morse_char, morse_dict)
    return text

def get_key(val, my_dict):
    for key, value in my_dict.items():
        if val == value:
            return key
    return ''
""" 
def get_user_input():
    user_input = input("Enter text or Morse code: ")
    if set('.-/').intersection(user_input):
        return user_input, 'morse'
    else:
        return user_input, 'text'
 """    
""" def main():
    user_input, input_type = get_user_input()
    if input_type == 'text':
        print("Translate to Morse Code:", text_to_morse(user_input))
    else:
        print("Translate to Text:", morse_to_text(user_input))

if __name__ == "__main__":
    main()

 """
# creat the main window:

root = tk.Tk()
root.title("Morse Code Translator")

def determine_input_type(user_input):
    if set('.-/').intersection(user_input):
        return 'morse'
    else:
        return 'text'
    
def translate():
    user_input = input_text.get("1.0", tk.END).strip()
    input_type = determine_input_type(user_input)

    if input_type == 'text':
        translated = text_to_morse(user_input)
    else:
        translated = morse_to_text(user_input)

    output_text.delete("1.0", tk.END)
    output_text.insert(tk.INSERT, translated)

def clear_text():
    input_text.delete("1.0", tk.END)
    output_text.delete("1.0", tk.END)


# Input text Box

input_text =scrolledtext.ScrolledText(root, height = 10, width = 50)
input_text.pack(pady=15)

# translate button
translate_button = tk.Button(root, text="Translate", command=translate)
translate_button.pack(pady=5)

# Output text box
output_text = scrolledtext.ScrolledText(root, height =10 , width =50)
output_text.pack(pady=10)

# clear button
clear_button = tk.Button(root, text= "clear", command =clear_text)
clear_button.pack(pady=5)

root.mainloop()
