#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include "DHTesp.h"

#define DHTpin 14    //D5 of NodeMCU is GPIO14
DHTesp dht;

// Uncomment one of the lines below for whatever DHT sensor type you're using!

//#define DHTTYPE DHT21   // DHT 21 (AM2301)
//#define DHTTYPE DHT22   // DHT 22  (AM2302), AM2321

/* Put your SSID & Password */
const char* ssid = "Tasnim";       // Enter SSID here
const char* password = "peara2304";  // Enter Password here

ESP8266WebServer server(80);




// MQ-4 Gas Sensor
uint8_t MQ4Pin = A0;

float Temperature = dht.getTemperature();  // Gets the values of the temperature
 float Humidity = dht.getHumidity();        // Gets the values of the humidity
 float  GasValue = analogRead(MQ4Pin);       // Gets the values of the gas sensor

void setup() {
  Serial.begin(115200);
  delay(10);

  dht.setup(DHTpin, DHTesp::DHT11);
  pinMode(MQ4Pin, INPUT);



  Serial.println("Connecting to ");
  Serial.println(ssid);

  // Connect to your local Wi-Fi network
  WiFi.begin(ssid, password);

  // Check Wi-Fi connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected..!");
  Serial.print("Got IP: ");
  Serial.println(WiFi.localIP());

  server.on("/", HTTP_GET, handle_OnConnect);
  server.on("/data", HTTP_GET, handle_Data);
  server.onNotFound(handle_NotFound);

  server.begin();
  Serial.println("HTTP server started");
}

void loop() {
  server.handleClient();
}

void handle_OnConnect() {
 float Temperature = dht.getTemperature();
  float Humidity = dht.getHumidity();
  float GasValue = analogRead(MQ4Pin);

  server.send(200, "text/html", SendHTML(Temperature, Humidity, GasValue));
}

void handle_Data() {
  float Temperature = dht.getTemperature();
  float Humidity = dht.getHumidity();
  float GasValue = analogRead(MQ4Pin);

  String data = "{\"Temperature\":" + String(Temperature) +
                ",\"Humidity\":" + String(Humidity) +
                ",\"gasValue\":" + String(GasValue) + "}";
  server.send(200, "application/json", data);
}

void handle_NotFound() {
  server.send(404, "text/plain", "Not found");
}

String SendHTML(float Temperaturestat, float Humiditystat, float GasValueStat) {
  String ptr = "<!DOCTYPE html> <html>\n";
  ptr += "<head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, user-scalable=no\">\n";
  ptr += "<title>ESP8266 Weather and Gas Report</title>\n";
  ptr += "</head>\n";
  ptr += "<body>\n";
  ptr += "<div id=\"webpage\">\n";
  ptr += "<h1>ESP8266 NodeMCU Weather and Gas Report</h1>\n";
  ptr += "<p id='Temperature'>Temperature: " + String(Temperaturestat) + "°C</p>\n";
  ptr += "<p id='Humidity'>Humidity: " + String(Humiditystat) + "%</p>\n";
  ptr += "<p id='gasValue'>Gas Value: " + String(GasValueStat) + "</p>\n";
  ptr += "</div>\n";
  ptr += "<script>\n";
  ptr += "function updateData() {\n";
  ptr += "  var xhttp = new XMLHttpRequest();\n";
  ptr += "  xhttp.onreadystatechange = function() {\n";
  ptr += "    if (this.readyState == 4 && this.status == 200) {\n";
  ptr += "      var data = JSON.parse(this.responseText);\n";
  ptr += "      document.getElementById('Temperature').innerHTML = 'Temperature: ' + data.Temperature + '°C';\n";
  ptr += "      document.getElementById('Humidity').innerHTML = 'Humidity: ' + data.Humidity + '%';\n";
  ptr += "      document.getElementById('gasValue').innerHTML = 'Gas Value: ' + data.gasValue;\n";
  ptr += "    }\n";
  ptr += "  };\n";
  ptr += "  xhttp.open('GET', '/data', true);\n";
  ptr += "  xhttp.send();\n";
  ptr += "}\n";
  ptr += "setInterval(updateData, 1000);\n";
  ptr += "function autoRefresh(){";
  ptr += "window.location = window.location.href;";
  ptr += "}\n";
  ptr += "setInterval('autoRefresh()',100000)";
  ptr += "</script>\n";
  ptr += "</body>\n";
  ptr += "</html>\n";
  return ptr;
}