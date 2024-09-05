/**useEffect(() => {
    console.log('use me')
    axios.get('http://192.168.56.1:8000/backend1/send_food_items/')
      .then(response => {
        // Handle successful response
        console.log(response.data)
        console.log('Frog');
        setHorizontalScrollMenuArray(response.data);
      })
      .catch(err => {
        // Handle Error
        console.log('Failure')
        console.log(err);
      });
  }, []);


  const sendPostRequest = async () => {
    try {
        // Make the POST request
        const result = await axios.post('http://192.168.56.1:8000/backend1/send_food_items/', index_, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
  
        // Process the response
        console.log(result.data);
        setcurrentFoodItemsInDisplay(result.data)
    } catch (error) {
        console.error('There was an error!', error);
    }
  };

  let url = "ws://192.168.56.1:8000/ws/socket-server/"
        const chatSocket = new WebSocket(url);
        const [inputValue, setInputValue] = useState('');
        const [edit_queue, setedit_queue] = useState([''])
        
        chatSocket.onmessage = function(e){
                let data = JSON.parse(e.data);
                console.log('Data: ',data);
                if (data.type === 'background-color'){
                        setbackground(data.message);
                }
        }

        <button onClick={()=>{chatSocket.send(JSON.stringify({message:"brown"}))}} className="rounded-full border-2 border-green-300 w-2/12">Brown</button>
        */