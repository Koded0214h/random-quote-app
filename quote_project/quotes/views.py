from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Quote
from .serializers import QuoteSerializer
import random

@api_view(['GET'])
def random_quote(request):
    quotes = Quote.objects.all()
    if not quotes:
        return Response({"text": "No quotes yet", "author": "System"})
    quote = random.choice(quotes)
    serializer = QuoteSerializer(quote)
    return Response(serializer.data)
