import requests
from requests.sessions import session


url = "http://automationpractice.com/index.php?rand=1" 
session = requests.Session()

response1 = session.get(url)


payload_add_to_cart = {
	"controller": "cart",
	"add": 1,
	"ajax": True,
	"qty": 1,
	"id_product":1,
	"token": "e817bb0705dd58da8db074c69f729fd8"
}

# I was not able to get the right response on the delete POST service

# payload_delete_from_cart = {
# 	"controller": "cart",
# 	"delete": 1,
# 	"id_product": 1,
# 	#"ipa": 19,
# 	"id_address_delivery": 0,
# 	"token": "e817bb0705dd58da8db074c69f729fd8",
# 	"ajax": True,
# }


	
def test_add_to_the_cart():
	number_of_products = 0
	total_price_of_products = 0
	for x in range(1,10):
		payload_add_to_cart["id_product"] = x
		response2 = session.post(url,data=payload_add_to_cart)
		assert response2.status_code == 200
		response_body = response2.json()
		
		if payload_add_to_cart["id_product"] <=7:
			number_of_products +=1
			new_product_added = response_body["products"][-1]
			
			total_price_of_products += round(new_product_added['price_float'], 2)
		
			assert response_body["hasError"]== False
			assert response_body['nbTotalProducts'] == number_of_products
			assert float(response_body['productTotal'][1:]) == round(total_price_of_products,2)
		else:
			assert response_body["hasError"]== True
			assert response_body["errors"][0] == 'This product is no longer available.'



# response3 = session.post(url,data=payload_add_to_cart)
# response4 = session.post(url,data=payload_delete_from_cart)

# print(response3.json())
# print(response4.json())




