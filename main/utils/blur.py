import blurhash
import requests

def getBlurCodeFromImage(imageUrl):
        placeHolderImage = "./tmp/placeholder.jpg"
        retrieveImageFromUrlAndSaveToLocal(imageUrl, placeHolderImage)
        return blurhash.encode(placeHolderImage, x_components=4, y_components=6)

def retrieveImageFromUrlAndSaveToLocal(imageUrl, localImageName):
    headers = headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Cafari/537.36'}

    pic = requests.get(imageUrl, headers=headers)

    with open(localImageName, 'wb') as photo:
        photo.write(pic.content)
