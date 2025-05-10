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

@api_view(['GET', 'POST'])
def quotes(request):
    if request.method == "GET":
        quotes = Quote.objects.all()
        serializer = QuoteSerializer(quotes, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = QuoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
@api_view(['PUT', 'DELETE'])
def quote_detail(request, pk):
    try:
        quote = Quote.objects.get(id=pk)
    except Quote.DoesNotExist:
        return Response({"error": "Quote not found"}, status=404)
    
    if request.method == "PUT":
        serializer = QuoteSerializer(quote, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
    elif request.method == "DELETE":
        quote.delete()
        return Response({"message": "Quote deleted"})  
        
    
        
        