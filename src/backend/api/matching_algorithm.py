from typing import List
import torch
from sklearn.metrics.pairwise import cosine_similarity


def get_free_text_match(
    job_embeddings: List[List],
    candidate_embeddings: List[List],
) -> float:
    """
    This function calcualtes cosine similarity between two text embeddings,
    given in a form of a tensor list.

    Parameters
    -------------
    job_embeddings: a tensor list with text embedding
    mcandidate_embeddings: a tensor list with text embedding

    Returns
    -------------
    float: a number from -1 to 1 indicating cosine similarity

    """
    if (candidate_embeddings) == None or (job_embeddings) == None:
        return 0

    if type(candidate_embeddings) == str or type(job_embeddings) == str:
        return 0

    return cosine_similarity(candidate_embeddings, job_embeddings)[0][0]

if __name__=="__main__":
    print(int(get_free_text_match(
    torch.tensor([[1,0,0]]),
    torch.tensor([[-1,0,0]]),
))==-1)
