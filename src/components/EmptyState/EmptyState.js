import './EmptyState.css';

const EmptyState = () => {
  return (
    <>
      <h2 className='sub-title'>We're sorry, this page does not exist. Please go back</h2>
      <section className='empty-state-container' >
        <img className='empty-state-img' src={process.env.PUBLIC_URL + "/images/broken-record.png"} alt="vinyl record cracked in half" />
      </section>
    </>
  );
};

export default EmptyState;
