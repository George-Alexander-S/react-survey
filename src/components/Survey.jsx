import { useState } from "react";
import { useEffect } from "react";
import AnswersList from "./AnswersList";
import AnswersItem from "./AnswersItem";

function Survey() {
  const [open, setOpen] = useState(false); //Ignore this state

  // const [textData, setTextData] = useState("")

  const [checkedBoxes, setCheckedBoxes] = useState([])

  const [formData, setFormData] = useState({
    colour: "",
    timeSpent: [],
    review: "",
    username: "",
    email: ""
  })

  const [savedForms, setSavedForm] = useState([])

  const submitForm = () => {
    setSavedForm(formData)
  }

  const handleSubmit = (event) => {
    console.log(formData)
    event.preventDefault();
  };

  const handleCheckBox = (event) => {
    let newArray = [...checkedBoxes, event.target.value];
    if (checkedBoxes.includes(event.target.value)) {
      newArray = newArray.filter(timeSpent => timeSpent !== event.target.value);
    }
    setCheckedBoxes(newArray)
    handleChange(event)
  }

  useEffect(() => {
    console.log(checkedBoxes)   
  }, [handleCheckBox])


  const handleChange = (event) => {
    if (event.target.type === "checkbox") {
      let newArray = [...formData.timeSpent]

      if (newArray.includes(event.target.value)) {
        newArray = newArray.filter(timeSpent => timeSpent !== event.target.value)
      }
      else {
        newArray.push(event.target.value)
      }
      setFormData({...formData,
        timeSpent: newArray
      })
    }
    else {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    console.log([event.target.name])
    console.log([event.target.value])
  }
  };

  useEffect(() => {
    console.log(formData)
  }, [handleChange])


  return (
    <main className="survey">
      <section className={`survey__list ${open ? "open" : ""}`}>
        <h2>Answers list</h2>
        {/* answers should go here */}
        <AnswersItem 
        answerItem={formData}
        
        />
      </section>
      <section className="survey__form">{/* a form should be here */}
        <form className="form" onSubmit={handleSubmit}>
          <h2>Tell us what you think about your rubber duck!</h2>
          <div className="form__group radio">
            <h3>How do you rate your rubber duck colour?</h3>
            {/* <!-- Radio inputs go here --> */}
            <ul>
              <li>
                <input id="colour-one" type="radio" name="colour" value="1"
                onChange={handleChange}
                />
                <label htmlFor="colour-one"
                >1</label
                >
              </li>
              <li>
                <input id="colour-two" type="radio" name="colour" value="2" 
                onChange={handleChange}
                /><label
                  htmlFor="colour-two"
                >2</label
                >
              </li>
              <li>
                <input id="colour-three" type="radio" name="colour" value="3"
                onChange={handleChange}
                /><label
                  htmlFor="colour-three"
                >3</label
                >
              </li>
              <li>
                <input id="colour-four" type="radio" name="colour" value="4"
                onChange={handleChange}
                /><label
                  htmlFor="colour-four"
                >4</label
                >
              </li>
            </ul>
          </div>
          <div className="form__group">
            <h3>How do you like to spend time with your rubber duck</h3>
            {/* <!-- checkboxes go here --> */}
            <ul>
              <li>
                <label
                  ><input
                    id="1"
                    name="spendtime"
                    type="checkbox"
                    value="swimming"
                    onChange={handleCheckBox}
                  />Swimming</label
                >
              </li>
              <li>
                <label
                  ><input
                  id="2"
                  name="spendtime"
                  type="checkbox"
                  value="bathing"
                  onChange={handleCheckBox}
                  />Bathing</label
                >
              </li>
              <li>
                <label
                  ><input
                    id="3"
                    name="spendtime"
                    type="checkbox"
                    value="chatting"
                    onChange={handleCheckBox}
                    />Chatting</label
                >
              </li>
              <li>
                <label
                  ><input
                    id="4"
                    name="spendtime" 
                    type="checkbox"
                    value="noTime"
                    onChange={handleCheckBox}
                    />I don't like to
                    spend time with it</label
                >
              </li>
            </ul>
          </div>
          <label
          >What else have you got to say about your rubber duck?<textarea
            name="review"
            cols="30"
            rows="10"
            value={formData.review}
            onChange={handleChange}
          ></textarea></label
          ><label
          >Put your name here (if you feel like it):<input
              type="text"
              name="username"
              value={formData.text}
              onChange={handleChange}
              /></label
          ><label
          >Leave us your email pretty please??<input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              /></label
          >
          <input
          className="form__submit" 
          type="submit" 
          value="Submit Survey!" 
          onClick={() => submitForm()}
          />
        </form>
      </section>
    </main>
  );
}

export default Survey;
