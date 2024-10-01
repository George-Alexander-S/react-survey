import AnswersItem from "./AnswersItem";

export default function AnswersList(props) {
  console.log("Inside AnswersList: ", props);

  const { answersList, editHandler } = props;

  return (
    <ul>
      {answersList.map((answerItem) => (
        <AnswersItem answerItem={answerItem} editHandler={editHandler} key={answerItem.id} />
      ))}
    </ul>
  );
}
