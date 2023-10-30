import json
from src.backend.api.tokenization_n_embedding import tokenize_text, generate_embeddings
from src.backend.api.matching_algorithm import get_free_text_match


def test_tokenize_text():
    text_tokens_keys = set(['input_ids','token_type_ids','attention_mask'])
    assert set(tokenize_text("test").keys()) == \
        text_tokens_keys
    assert set(tokenize_text("").keys()) == \
        text_tokens_keys
    
def test_generate_embeddings():
    embeddings = json.loads(generate_embeddings("any text"))
    assert len(embeddings) == 1
    assert len(embeddings[0]) == 768

def test_get_free_text_match_text():
    assert get_free_text_match(
            "[[1,2,3]]",
            "[[-1,-2,-3]]"
    ) == -100
    assert get_free_text_match(
            "[[1,2,3]]",
            "[[1,2,3]]"
    ) == 100
    assert get_free_text_match(
    "[[1,0,0]]",
    "[[0,1,0]]"
    ) == 0