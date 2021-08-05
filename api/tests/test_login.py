import requests
from requests.sessions import session


url = "http://automationpractice.com/index.php" 
session = requests.Session()

response1 = session.get(url)

email_invalid = 'Jonh'
email_valid = 'Jonha@example.com'

payload = {
	"controller": "authentication",
	"SubmitCreate": "1",
	"ajax": "true",
	"email_create": "",
	"back": "my-account",
	"token": "ce65cefcbafad255f0866d3b32d32058"
}

def test_invalid_login():
    payload["email_create"] = email_invalid
    
    response2 = session.post(url,data=payload)
	
    response_body = response2.json()
    assert response1.status_code == 200
    assert response_body["hasError"]== True
    assert response_body["errors"][0] == 'Invalid email address.'

def test_valid_login():
    payload["email_create"] = email_valid
    
    response2 = session.post(url,data=payload)
	
    response_body = response2.json()
    assert response1.status_code == 200
    assert response_body["hasError"]== False
