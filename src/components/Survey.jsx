import { useState } from "react";
import AnswersList from "./AnswersList";

function Survey() {
  const [open, setOpen] = useState(false); //Ignore this state

  const [checkedBoxes, setCheckedBoxes] = useState([])

  const [formData, setFormData] = useState({
    id: null,
    colour: "",
    timeSpent: [],
    review: "",
    username: "",
    email: ""
  })

  const [savedForms, setSavedForm] = useState([])

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.id) {
      setSavedForm((prevSaved) => 
      prevSaved.map((answer) => 
      answer.id === formData.id ? formData : answer))
    }
    else {
      const newAnswer = {...formData, id: savedForms.length + 1}
      setSavedForm((prevSaved) => [...prevSaved, newAnswer])
    }
    event.target.reset()
    setFormData({
      colour: "",
      timeSpent: [],
      review: "",
      username: "",
      email: ""
    })
  };

  const handleCheckBox = (event) => {
    let newArray = [...checkedBoxes, event.target.value];
    if (checkedBoxes.includes(event.target.value)) {
      newArray = newArray.filter(timeSpent => timeSpent !== event.target.value);
    }
    setCheckedBoxes(newArray)
    handleChange(event)
  }

  const handleChange = (event) => {
    if (event.target.type === "checkbox") {
      let newArray = [...formData.timeSpent]

      if (newArray.includes(event.target.value)) {
        newArray = newArray.filter(timeSpent => timeSpent !== event.target.value)
      }
      else {
        newArray.push(event.target.value)
      }
      setFormData({
        ...formData,
        timeSpent: newArray
      })
    }
    else {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    }
  };

  const editHandler = (id) => {
    console.log("Editing id"+id)
    const editing = savedForms.find((form) => form.id === id)
    console.log(editing)
    // setEditData(editing)
    setFormData(editing)
  }

  return (
    <main className="survey">
      <section className={`survey__list ${open ? "open" : ""}`}>
        <h2>Answers list</h2>
        {/* answers should go here */}
        <AnswersList answersList={savedForms} editHandler={editHandler}/>
      </section>
      <section className="survey__form">{/* a form should be here */}
        <form className="form" onSubmit={handleSubmit}>
          <h2>Tell us what you think about your rubber duck!</h2>
          <div className="form__group radio">
            <h3>How do you rate your rubber duck colour?</h3>
            {/* <!-- Radio inputs go here --> */}
            <ul>
              <li>
                <input 
                id="colour-one" 
                type="radio" 
                name="colour" 
                value="1"
                checked={formData.colour === "1"? true : undefined}
                onChange={handleChange}
                />
                <label htmlFor="colour-one"
                >1</label
                >
              </li>
              <li>
                <input 
                id="colour-two" 
                type="radio" 
                name="colour" 
                value="2"
                checked={formData.colour === "2"? true : undefined}
                onChange={handleChange}
                /><label
                  htmlFor="colour-two"
                >2</label
                >
              </li>
              <li>
                <input 
                id="colour-three" 
                type="radio" 
                name="colour" 
                value="3"
                checked={formData.colour === "3"? true : undefined}
                onChange={handleChange}
                /><label
                  htmlFor="colour-three"
                >3</label
                >
              </li>
              <li>
                <input 
                id="colour-four" 
                type="radio" 
                name="colour" 
                value="4"
                checked={formData.colour === "4"? true : undefined}
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
                    checked={formData.timeSpent?.includes("swimming")? true : undefined}
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
                    checked={formData.timeSpent?.includes("bathing")? true : undefined}
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
                    checked={formData.timeSpent?.includes("chatting")? true : undefined}
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
                    checked={formData.timeSpent?.includes("noTime")? true : undefined}
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
            // onClick={() => submitForm()}
          />
        </form>
      </section>
    </main>
  );
}

export default Survey;
