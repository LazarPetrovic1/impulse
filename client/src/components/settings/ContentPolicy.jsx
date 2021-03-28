import React, { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext'
import { policycomponent } from '../../utils/langObject';

const {
  _contentpolicy,
  _one,
  _two,
  _three,
  _four,
  _five,
  _six,
  _sixone,
  _sixtwo,
  _sixthree,
  _sixfour,
  _sixfive,
  _sixsix,
  _sixseven,
  _seven,
  _eight,
  _eightone,
  _eighttwo,
  _eightthree,
  _nine,
  _nineone,
  _ninetwo
} = policycomponent

function ContentPolicy() {
  const { language } = useContext(LanguageContext)
  return (
    <div style={{ overflow: "auto", height: "calc(100vh - 86px)" }}>
      <h1 className="text-primary text-center display-4">{_contentpolicy[language]}</h1>
      <div className="my-4 px-3">
        <ol>
          <li className="p-2" style={{ fontSize: "1.4rem" }}>{_one[language]}</li>
          <li className="p-2" style={{ fontSize: "1.4rem" }}>{_two[language]}</li>
          <li className="p-2" style={{ fontSize: "1.4rem" }}>{_three[language]}</li>
          <li className="p-2" style={{ fontSize: "1.4rem" }}>{_four[language]}</li>
          <li className="p-2" style={{ fontSize: "1.4rem" }}>{_five[language]}</li>
          <li className="p-2" style={{ fontSize: "1.4rem" }}>{_six[language]}</li>
            <ul>
              <li className="p-2" style={{ fontSize: "1.2rem" }}>{_sixone[language]}</li>
              <li className="p-2" style={{ fontSize: "1.2rem" }}>{_sixtwo[language]}</li>
              <li className="p-2" style={{ fontSize: "1.2rem" }}>{_sixthree[language]}</li>
              <li className="p-2" style={{ fontSize: "1.2rem" }}>{_sixfour[language]}</li>
              <li className="p-2" style={{ fontSize: "1.2rem" }}>{_sixfive[language]}</li>
              <li className="p-2" style={{ fontSize: "1.2rem" }}>{_sixsix[language]}</li>
              <li className="p-2" style={{ fontSize: "1.2rem" }}>{_sixseven[language]}</li>
            </ul>
          <li className="p-2" style={{ fontSize: "1.4rem" }}>{_seven[language]}</li>
          <li className="p-2" style={{ fontSize: "1.4rem" }}>{_eight[language]}</li>
            <ul>
              <li className="p-2" style={{ fontSize: "1.2rem" }}>{_eightone[language]}</li>
              <li className="p-2" style={{ fontSize: "1.2rem" }}>{_eighttwo[language]}</li>
              <li className="p-2" style={{ fontSize: "1.2rem" }}>{_eightthree[language]}</li>
            </ul>
          <li className="p-2" style={{ fontSize: "1.4rem" }}>{_nine[language]}</li>
          <ul>
            <li className="p-2" style={{ fontSize: "1.2rem" }}>{_nineone[language]}</li>
            <li className="p-2" style={{ fontSize: "1.2rem" }}>{_ninetwo[language]}</li>
          </ul>
        </ol>
      </div>
    </div>
  )
}

export default ContentPolicy;
