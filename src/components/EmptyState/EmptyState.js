import './EmptyState.css';

const EmptyState = () => {
  return (
    <section className='empty-state-container' >
      <h2 EmptyState='empty-state-message' >We're sorry, this page does not exist. Please go back</h2>
      <img className='empty-state-img' src={process.env.PUBLIC_URL + "/images/broken-record.png"} alt="vinyl record cracked in half" />
    </section>
  );
};

export default EmptyState;