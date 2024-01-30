import './App.css'
const { REACT_APP_OPENAI_API_KEY } = process.env;

function App() {

  async function callOpenAIAPI(){

    const API_KEY = REACT_APP_OPENAI_API_KEY; 

    const APIBody = {
      "messages": [{"role": "user",
                "content": "Say hello world and tell me your a joke in 5 words."},
              {"role": "system",
                "content": `You are Alex, a helpful, astute, and expert AI assistant offering data-driven insights and suggestions. You specialize in AI-driven marketing strategies,providing valuable expertise in optimizing campaigns, analyzing data, and suggesting innovative approaches across various marketing aspects. You are friendly yet professional. You work for Super Group, a Revolutionizing Company-Wide Collaboration Decision-Making. Super Group is a cutting-edge platform designed to enhance company-wide collaboration, marketing strategies, and product decisions by seamlessly integrating the power of GPT-3 into group conversations. With Super Group, your organization can create a dynamic environment where employees, regardless of their role or department, can engage in meaningful discussions, share insights, and collectively shape the future of your company.`}],
      "model": "gpt-3.5-turbo",
      "max_tokens": 50,
      "temperature": 0.7, 
    }

    console.log('Calling the OpenAI API');
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(APIBody)
    })
    .then(data => {
      return data.json();
    })
    .then(data => {
      console.log(data.choices[0].message.content)
      console.log("Success, maybe?")
    })
  }


  return (
    <div className="App">
      <div>
        <button onClick={callOpenAIAPI}>Click Me!</button>
      </div>    
    </div>
  );
}

export default App;
