import torch
import sys
import os
current = os.path.dirname(os.path.realpath('tokenization_n_embedding.py'))
parent = os.path.dirname(current)
sys.path.append(parent)
from src.backend.api.tokenization_n_embedding import tokenize_text, generate_embeddings
from src.backend.api.matching_algorithm import get_free_text_match

def test_tokenize_text():
    text_tokens_keys = set(['input_ids','token_type_ids','attention_mask'])
    assert set(tokenize_text("test").keys()) == \
        text_tokens_keys
    assert set(tokenize_text("").keys()) == \
        text_tokens_keys
    
def generate_embeddings():
    assert len(generate_embeddings("any text")) == 1
    assert len(generate_embeddings("any text")[0]) == 768
    assert generate_embeddings("").dtype == torch.float32
    assert generate_embeddings("")[0][0].item()==-0.00922924280166626

def get_free_text_match_text():
    assert get_free_text_match(int(
            torch.tensor([[1,2,3]]),
            torch.tensor([[-1,-2,-3]])
    )) == -1
    assert get_free_text_match(int(
            torch.tensor([[1,2,3]]),
            torch.tensor([[1,2,3]])
    )) == 1
    assert get_free_text_match(int(
    torch.tensor([[1,0,0]]),
    torch.tensor([[0,1,0]]),
    )) == 0