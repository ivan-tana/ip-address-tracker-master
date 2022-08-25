

async function GeoLocateIp(ip){
    
    try{
            let responce = await fetch("https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_jk2DXbKnHCVn0wSfq75GxaXJ6BjSO&ipAddress="+ ip)
            let data = await responce.json() 
            let results =  await {
                "location": data.location,
                "isp":data.isp,
                "proxy":data.proxy,
                "domains":data.domains,
                "ip":ip
            }
            
            console.log(data)
            GetData(results)
            
    
        
    }
    
    catch (err){
        alert("please turn off any adBlocker or check your internet connection")
    }
    

}

function TrackIp()
{
    console.log('searching')
    ip = document.querySelector('#ip_address').value
    GeoLocateIp(ip)
}


function GetData(data)
{
    map = document.querySelector('#map')
    
    let ip_out = document.querySelector('#ip_out')
    let loc_out = document.querySelector('#loc_out')
    let utc_out = document.querySelector('#utc_out')
    let isp_out = document.querySelector('#isp_out')
    
    loc_out.innerText = data.location.city + " , " + data.location.country
    isp_out.innerText = data.isp
    ip_out.innerText = data.ip
    utc_out.innerText =  "UTC " + data.location.timezone
    
    drawMap(data.location.lat,data.location.lng,100,true)
 
    
}
function drawMap(lat,lng,zoom=40,mark=true)
{
    
    createMap()
   
    let map = L.map('map').setView([lat, lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: zoom,
        attribution: '© OpenStreetMap'
    }).addTo(map);
    
    if(mark){
        var marker = L.marker([lat,lng]).addTo(map);
    }
    
   

}

function createMap()
{
   

    map_container = document.querySelector('#map_container')
    
    map = map_container.querySelector("#map")
    if(map == null)
    {
        map_element = document.createElement('div')
        map_container.append(map_element)
        map_element.id = 'map'
    }else {
        map.remove()
        map_element = document.createElement('div')
        map_container.append(map_element)
        map_element.id = 'map'
    }
    

}

GeoLocateIp("8.8.8.8")

