import React, { Fragment, useContext } from 'react';
import { registercomponent } from "../../../utils/langObject"
import { LanguageContext } from '../../../contexts/LanguageContext'
import TermsConditions from '../../../styled/TermsConditions';

const {
  agreewithterms,
  looksgood,
  agreement
} = registercomponent

function StepFive({ check, setcheck, onProgressChange }) {
  const { language } = useContext(LanguageContext)
  return (
    <Fragment>
      <TermsConditions className='container-md'>
        <h2>License, terms and conditions</h2>
        <p className='lead'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus architecto ipsum eaque sit, consectetur a laborum quod autem deserunt amet qui accusamus facilis nam nesciunt beatae quas esse officiis officia, maxime natus harum unde ullam. Ducimus aliquam iusto laboriosam deserunt similique voluptate expedita inventore, voluptas impedit, aut rem deleniti molestias! Maiores recusandae consectetur magni libero amet saepe hic alias! Eligendi iste fugiat similique, dolorem reiciendis assumenda rem modi, quas ab veniam eveniet laboriosam voluptatem culpa vero impedit! Nobis eligendi magni, animi neque autem perferendis pariatur saepe ad rerum possimus ea asperiores aut, distinctio maxime illo provident est ut eum, fugiat ipsam itaque eveniet. Reiciendis incidunt, ea dolore molestias, quia tempore ab neque fugiat voluptas quas alias iure ipsum asperiores. Ab amet optio aliquid! Iste odit debitis at quod velit, corporis facilis maxime, temporibus earum similique delectus inventore deserunt ipsum hic. Maxime porro minima, molestiae optio hic eum quidem saepe reiciendis necessitatibus quia ducimus quibusdam iure itaque rerum dolores ipsum vitae pariatur eligendi, repellat culpa laudantium delectus nesciunt fugit maiores. Quo tenetur, dicta vero voluptate rerum ratione doloribus veniam dolor autem quis aliquid mollitia, laborum blanditiis molestias. Incidunt voluptatem, esse veniam voluptas aliquam officiis beatae provident? Enim architecto, natus corporis doloremque non doloribus veniam illo minima. Iste aliquid facere dolorum adipisci, quis nisi ullam veniam ipsa expedita animi atque quae quibusdam doloremque, eaque corporis quam veritatis assumenda voluptatem. Cum tenetur dolorum unde nemo, soluta obcaecati laborum repellendus nobis quasi aut harum consequatur, quas! Harum eveniet tempora numquam natus ab tempore ducimus.</p>
      </TermsConditions>
      <div className='custom-control custom-checkbox'>
        <input
          value={check}
          onChange={() => setcheck(!check)}
          type='checkbox'
          className={
            check
              ? 'custom-control-input is-valid'
              : 'custom-control-input is-invalid'
          }
          name='check'
          id='check'
          required
        />
        <label className='custom-control-label' htmlFor='check'>{agreewithterms[language]}</label>
      </div>
      {
        check ? (
          <div className="valid-feedback d-block">{looksgood[language]}</div>
        ) : (
          <div className="invalid-feedback">{agreement[language]}</div>
      )}
      <div className="d-flex justify-content-end">
        <button className="btn btn-secondary" onClick={() => onProgressChange([check])}>
          Proceed&nbsp;&nbsp;<i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </Fragment>
  )
}

export default StepFive;
