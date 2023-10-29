import json
import torch
from typing import List
from transformers import AutoTokenizer, AutoModel


MODEL_NAME = "bert-base-uncased"

def tokenize_text(text: str, model_name: str=MODEL_NAME) -> dict:
    '''
    This function tokenizes a text as a preparation to calculate text embedding.

    Parameters
    -------------
    text: a text to be tokenized
    model_name: a name of the pretrained model within transformers library

    Returns
    -------------
    dictionary with ids of tokens, token types and attention mask 
    '''
    # Load the pre-trained BERT model and tokenizer
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    #generate tokens
    text_tokens = tokenizer(text, padding=True, truncation=True, return_tensors="pt")
    return text_tokens


def generate_embeddings(text: str, model_name: str=MODEL_NAME) -> List[List]:
    '''
    This function generated text embedding from a text (including tokenesation step).
    
    Parameters
    -------------
    text: a text to be tokenized
    model_name: a name of the pretrained model within transformers library
    
    Returns
    -------------
    A tensor list with text embedding in accordance to the chosen model
    '''
    model = AutoModel.from_pretrained(model_name)
    text_tokens = tokenize_text(text)
    with torch.no_grad():
        text_outputs = model(**text_tokens)
    text_embeddings = text_outputs.last_hidden_state.mean(dim=1)
    return json.dumps(text_embeddings.tolist())

if __name__=="__main__":
    s = ""
    print(generate_embeddings(s)[0][0].item()==-0.00922924280166626)