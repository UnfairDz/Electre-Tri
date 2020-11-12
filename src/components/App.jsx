import React, { useState } from "react";
import "./app.css";

function App() {
  const [classes, setClasses] = useState(2);
  const [lambda, setLambda] = useState(0.5);
  const [aletrantives, setAletrantives] = useState(2);
  const [criteria, setCriteria] = useState(2);

  /**********
  Fonction qui ajoute
  les lignes de b
  **********************/

  function classesAdd() {
    var html = [];
    if (classes === 2) {
      return html;
    } else {
      for (var i = 3; i <= classes; i++) {
        html.unshift(
          <tr>
            <td>b{i + 1}</td>
            {criteriaAdd()}
          </tr>
        );
      }
    }
    return html;
  }

  /**********
  Fonction qui ajoute
  les lignes de a
  **********************/

  function aletrantivesAdd() {
    var html = [];
    if (aletrantives === 2) {
      return html;
    } else {
      for (var i = 3; i <= aletrantives; i++) {
        html.push(
          <tr>
            <td>a{i}</td>
            {criteriaAdd()}
          </tr>
        );
      }
    }
    return html;
  }

  /**********
  Fonction qui ajoute
  les titres des colonnes 
  de g 
  **********************/

  function criteriaAddTitles() {
    var html = [];
    if (criteria === 2) {
      return html;
    } else {
      for (var i = 3; i <= criteria; i++) {
        html.push(<td>g{i}</td>);
      }
    }
    return html;
  }

  /**********
  Fonction qui ajoute
  les cellules de la matrice
  ou l'utilisateur rentre les 
  données
  **********************/

  function criteriaAdd() {
    var html = [
      <td>
        <input className="data-input" type="number" name="filter[]"></input>
      </td>,
      <td>
        <input className="data-input" type="number" name="filter[]"></input>
      </td>,
    ];
    for (var i = 3; i <= criteria; i++) {
      html.push(
        <td>
          <input className="data-input" type="number" name="filter[]"></input>
        </td>
      );
    }
    return html;
  }

  /**********
  Fonction qui est appellé quand
  on click sur le btn Solution
  la plus grande fonction
  **********************/

  function resolve() {
    const newArray = [];

    /************
    Get toutes les 
    valeurs du tableau 1 
    et les mettrent dans
    un array (newArray)
    *************/

    var els = document.getElementsByName("filter[]");
    for (var i = 0; i < els.length; i++) {
      newArray.push(Number(els[i].value));
    }

    /************
    Mettre les valeurs de b
    dans un array qui contiendra
    des arrays 
    ex: [[b3g1,b3g2],[b2g1,b2g2],...] 
    *************/

    const bArray = newArray.slice(0, (Number(classes) + 1) * criteria);

    const bChunks = [];
    for (var index = 0; index < bArray.length; index += Number(criteria)) {
      const bChunk = bArray.slice(index, index + Number(criteria));
      bChunks.push(bChunk);
    }

    /************
    Mettre les valeurs de Q
    dans un array
    ex: [0.5,0.8, ...] 
    *************/

    const qArray = newArray.slice(
      (Number(classes) + 1) * criteria,
      (Number(classes) + 1) * criteria + Number(criteria)
    );

    /************
    Mettre les valeurs de P
    dans un array
    ex: [0.5,0.8, ...] 
    *************/

    const pArray = newArray.slice(
      (Number(classes) + 1) * criteria + Number(criteria),
      (Number(classes) + 1) * criteria + Number(criteria) + Number(criteria)
    );

    /************
    Mettre les valeurs de V
    dans un array
    ex: [0.5,0.8, ...] 
    *************/

    const vArray = newArray.slice(
      (Number(classes) + 1) * criteria + Number(criteria) + Number(criteria),
      (Number(classes) + 1) * criteria +
        Number(criteria) +
        Number(criteria) +
        Number(criteria)
    );

    /************
    Mettre les valeurs de W
    dans un array
    ex: [0.5,0.8, ...] 
    *************/

    const wArray = newArray.slice(
      (Number(classes) + 1) * criteria +
        Number(criteria) +
        Number(criteria) +
        Number(criteria),
      (Number(classes) + 1) * criteria +
        Number(criteria) +
        Number(criteria) +
        Number(criteria) +
        Number(criteria)
    );

    /************
    Mettre les valeurs de a
    dans un array qui contiendra
    des arrays 
    ex: [[a1g1,a1g2],[a2g1,a2g2],...] 
    *************/

    const aArray = newArray.slice(
      newArray.length - aletrantives * criteria,
      newArray.length
    );

    let aChunks = [];
    for (var index2 = 0; index2 < aArray.length; index2 += Number(criteria)) {
      const aChunk = aArray.slice(index2, index2 + Number(criteria));
      aChunks.push(aChunk);
    }

    /*********** 
      Calcule concordonce
    *******/

    const resultArray = [];

    for (var b = 0; b < bChunks.length; b++) {
      for (var a = 0; a < aChunks.length; a++) {
        for (var g = 0; g < criteria; g++) {
          if (bChunks[b][g] - aChunks[a][g] >= pArray[g]) {
            resultArray.push(0);
          } else if (bChunks[b][g] - aChunks[a][g] <= qArray[g]) {
            resultArray.push(1);
          } else {
            const pushResult =
              (pArray[g] + aChunks[a][g] - bChunks[b][g]) /
              (pArray[g] - qArray[g]);
            resultArray.push(pushResult);
          }
        }
      }
    }

    /*********** 
      Affichage des resultats de concordonce
      dans le tableau 
    *******/

    var result = document.getElementsByName("result[]");

    for (var j = 0; j < result.length; j++) {
      result[j].value = resultArray[j];
    }

    let resultChunks = [];
    for (
      var index3 = 0;
      index3 < resultArray.length;
      index3 += Number(criteria)
    ) {
      const aChunk = resultArray.slice(index3, index3 + Number(criteria));
      resultChunks.push(aChunk);
    }

    /*********** 
      Calcule concordonce globale
    *******/

    const cResultArray = [];

    for (var array = 0; array < resultChunks.length; array++) {
      var cResult = 0;
      var wSomme = 0;

      for (var el = 0; el < criteria; el++) {
        wSomme = wSomme + Number(wArray[el]);
        cResult += resultChunks[array][el] * wArray[el];
      }

      cResult = cResult / wSomme;
      if (isNaN(cResult)) {
        cResultArray.push(0);
      } else {
        cResultArray.push(cResult);
      }
    }

    /*********** 
      Affichage des resultats de concordonce
      globale dans le tableau
    *******/

    var cResultTable = document.getElementsByName("C");

    for (var j2 = 0; j2 < cResultArray.length; j2++) {
      cResultTable[j2].value = cResultArray[j2];
    }

    /*********** 
      Calcule concordonce Inverse 
    *******/

    const resultArrayInverse = [];

    for (var bInverse = 0; bInverse < bChunks.length; bInverse++) {
      for (var aInverse = 0; aInverse < aChunks.length; aInverse++) {
        for (var gInverse = 0; gInverse < criteria; gInverse++) {
          if (
            aChunks[aInverse][gInverse] - bChunks[bInverse][gInverse] >=
            pArray[gInverse]
          ) {
            resultArrayInverse.push(0);
          } else if (
            aChunks[aInverse][gInverse] - bChunks[bInverse][gInverse] <=
            qArray[gInverse]
          ) {
            resultArrayInverse.push(1);
          } else {
            const pushResult =
              (pArray[gInverse] +
                bChunks[bInverse][gInverse] -
                aChunks[aInverse][gInverse]) /
              (pArray[gInverse] - qArray[gInverse]);
            resultArrayInverse.push(pushResult);
          }
        }
      }
    }

    /*********** 
      Affichage des resultats de concordonce
      Inverse dans le tableau
    *******/

    var resultInverse = document.getElementsByName("resultInverse[]");

    for (var jInverse = 0; jInverse < result.length; jInverse++) {
      resultInverse[jInverse].value = resultArrayInverse[jInverse];
    }

    /* Récuperation des resultat de cocordance Inverse */

    let resultChunksInverse = [];
    for (
      var index3Inverse = 0;
      index3Inverse < resultArrayInverse.length;
      index3Inverse += Number(criteria)
    ) {
      const aChunk = resultArrayInverse.slice(
        index3Inverse,
        index3Inverse + Number(criteria)
      );
      resultChunksInverse.push(aChunk);
    }

    /*********** 
      Calcule concordonce Inverse globale
    *******/

    const cResultArrayInverse = [];

    for (
      var arrayInverse = 0;
      arrayInverse < resultChunksInverse.length;
      arrayInverse++
    ) {
      var cResultInverse = 0;
      var wSommeInverse = 0;

      for (var elInvverse = 0; elInvverse < criteria; elInvverse++) {
        wSommeInverse = wSommeInverse + Number(wArray[elInvverse]);
        cResultInverse +=
          resultChunksInverse[arrayInverse][elInvverse] * wArray[elInvverse];
      }

      cResultInverse = cResultInverse / wSommeInverse;
      if (isNaN(cResultInverse)) {
        cResultArrayInverse.push(0);
      } else {
        cResultArrayInverse.push(cResultInverse);
      }
    }

    /*********** 
      Affichage des resultats de concordonce
      globale Inverse dans le tableau
    *******/

    var cResult2 = document.getElementsByName("C2");

    for (var j2Inverse = 0; j2Inverse < cResultArray.length; j2Inverse++) {
      cResult2[j2Inverse].value = cResultArrayInverse[j2Inverse];
    }

    /***********
     Calcule de discordance
     **********/

    const resultArray2 = [];

    for (var b2 = 0; b2 < bChunks.length; b2++) {
      for (var a2 = 0; a2 < aChunks.length; a2++) {
        for (var g2 = 0; g2 < criteria; g2++) {
          if (bChunks[b2][g2] - aChunks[a2][g2] <= pArray[g2]) {
            resultArray2.push(0);
          } else if (vArray[g2] < bChunks[b2][g2] - aChunks[a2][g2]) {
            resultArray2.push(1);
          } else {
            const pushResult =
              (bChunks[b2][g2] - aChunks[a2][g2] - pArray[g2]) /
              (vArray[g2] - pArray[g2]);

            resultArray2.push(pushResult);
          }
        }
      }
    }

    /*********** 
      Affichage des resultats de discordance
      dans le tableau
    *******/

    var result2 = document.getElementsByName("result2[]");

    for (var j3 = 0; j3 < result2.length; j3++) {
      result2[j3].value = resultArray2[j3];
    }

    /***********
     Calcule de discordance Inverse
     **********/
    const resultArray2Inverse = [];

    for (var b2Inverse = 0; b2Inverse < bChunks.length; b2Inverse++) {
      for (var a2Inverse = 0; a2Inverse < aChunks.length; a2Inverse++) {
        for (var g2Inverse = 0; g2Inverse < criteria; g2Inverse++) {
          if (
            aChunks[a2Inverse][g2Inverse] - bChunks[b2Inverse][g2Inverse] <=
            pArray[g2Inverse]
          ) {
            resultArray2Inverse.push(0);
          } else if (
            vArray[g2Inverse] <
            aChunks[a2Inverse][g2Inverse] - bChunks[b2Inverse][g2Inverse]
          ) {
            resultArray2Inverse.push(1);
          } else {
            const pushResult =
              (aChunks[a2Inverse][g2Inverse] -
                bChunks[b2Inverse][g2Inverse] -
                pArray[g2Inverse]) /
              (vArray[g2Inverse] - pArray[g2Inverse]);

            resultArray2Inverse.push(pushResult);
          }
        }
      }
    }

    /*********** 
      Affichage des resultats de discordance
      Inverse dans le tableau
    *******/

    var result2Inverse = document.getElementsByName("result2Inverse[]");

    for (var j3Inverse = 0; j3Inverse < result2Inverse.length; j3Inverse++) {
      result2Inverse[j3Inverse].value = resultArray2Inverse[j3Inverse];
    }

    /*********
     Calcule credibilite
     *********/

    let resultChunks2 = [];
    for (
      var index4 = 0;
      index4 < resultArray2.length;
      index4 += Number(criteria)
    ) {
      const Chunk = resultArray2.slice(index4, index4 + Number(criteria));
      resultChunks2.push(Chunk);
    }

    const resultArray3 = [];

    for (var j4 = 0; j4 < cResultArray.length; j4++) {
      var resultat = 1;
      for (var j5 = 0; j5 < criteria; j5++) {
        if (resultChunks2[j4][j5] > cResultArray[j4]) {
          resultat *= (1 - resultChunks2[j4][j5]) / (1 - cResultArray[j4]);
        } else {
        }
      }
      resultat *= cResultArray[j4];
      resultArray3.push(resultat);
    }

    /*********** 
      Affichage des resultats de credibilite
      dans le tableau
    *******/

    var result3 = document.getElementsByName("credibilite");

    for (var j6 = 0; j6 < resultArray3.length; j6++) {
      result3[j6].value = resultArray3[j6];
    }

    /*********
     Calcule credibilite Inverse
     *********/

    let resultChunks2Inverse = [];
    for (
      var index4Inverse = 0;
      index4Inverse < resultArray2Inverse.length;
      index4Inverse += Number(criteria)
    ) {
      const Chunk = resultArray2Inverse.slice(
        index4Inverse,
        index4Inverse + Number(criteria)
      );
      resultChunks2Inverse.push(Chunk);
    }

    const resultArray3Inverse = [];

    for (
      var j4Inverse = 0;
      j4Inverse < cResultArrayInverse.length;
      j4Inverse++
    ) {
      var resultatInverse = 1;
      for (var j5Inverse = 0; j5Inverse < criteria; j5Inverse++) {
        if (
          resultChunks2Inverse[j4Inverse][j5Inverse] >
          cResultArrayInverse[j4Inverse]
        ) {
          resultatInverse *=
            (1 - resultChunks2Inverse[j4Inverse][j5Inverse]) /
            (1 - cResultArrayInverse[j4Inverse]);
        } else {
        }
      }
      resultatInverse *= cResultArrayInverse[j4Inverse];
      resultArray3Inverse.push(resultatInverse);
    }

    /*********** 
      Affichage des resultats de credibilite
      Inverse dans le tableau
    *******/

    var result3Inverse = document.getElementsByName("credibiliteInverse");

    for (
      var j6Inverse = 0;
      j6Inverse < resultArray3Inverse.length;
      j6Inverse++
    ) {
      result3Inverse[j6Inverse].value = resultArray3Inverse[j6Inverse];
    }

    /**************** Classification ****************/

    /************
    Mettre les valeurs de credibilité
    dans un array qui contiendra
    des arrays 
    ex: [[a1b4,a1b3,...],[a2b4,a2b3,...],...] 
    même chose pour credibilité inverse
    *************/

    const crédibilitéArrayAArrayB = [];
    const crédibilitéArrayAArrayBInverse = [];

    let from = 0;

    let contrainte = 1;

    for (var e = 6; e <= aletrantives; e++) {
      contrainte++;
    }

    for (
      var j7 = 0;
      j7 <= resultArray3.length + contrainte;
      j7 += Number(classes) + 2
    ) {
      const crédibilitéArray = [];
      const crédibilitéArrayInverse = [];

      for (
        var j8 = from;
        j8 < resultArray3.length;
        j8 += Number(aletrantives)
      ) {
        crédibilitéArray.push(resultArray3[j8]);
        crédibilitéArrayInverse.push(resultArray3Inverse[j8]);
      }

      from++;
      crédibilitéArrayAArrayB.push(crédibilitéArray);
      crédibilitéArrayAArrayBInverse.push(crédibilitéArrayInverse);
    }

    /*********
     Calcule Pessimiste
     *********/

    const resultPessimisteArray = [];

    for (var j9 = 0; j9 < crédibilitéArrayAArrayB.length; j9++) {
      for (var j10 = 1; j10 < crédibilitéArrayAArrayB[0].length; j10++) {
        if (
          (crédibilitéArrayAArrayB[j9][j10] >= lambda &&
            crédibilitéArrayAArrayBInverse[j9][j10] < lambda) ||
          (crédibilitéArrayAArrayB[j9][j10] >= lambda &&
            crédibilitéArrayAArrayBInverse[j9][j10] >= lambda)
        ) {
          let chose = Number(classes) + 1 - j10;
          resultPessimisteArray.push("C" + chose);
          break;
        }
      }
      if (resultPessimisteArray[j9] === undefined) {
        resultPessimisteArray.push("C" + Number(classes));
      }
    }

    /*********** 
      Affichage des resultats de Pessimiste
      dans le tableau
    *******/

    var pessimist = document.getElementsByName("pessimist");

    for (var j13 = 0; j13 < resultPessimisteArray.length; j13++) {
      pessimist[j13].value = resultPessimisteArray[j13];
    }

    /*********
     Calcule Optimiste
     *********/

    const resultOptimisteArray = [];

    /*
    a1b4 j11 =0 j12=0 4
    a1b3 j11 =0 j12=1 3 
    a1b2 j11 =0 j12=2 2 
    a1b1 j11 =0 j12=3 1
     */

    for (var j11 = 0; j11 < crédibilitéArrayAArrayB.length; j11++) {
      for (var j12 = crédibilitéArrayAArrayB[0].length - 2; j12 >= 0; j12--) {
        if (
          (crédibilitéArrayAArrayB[j11][j12] < lambda &&
            crédibilitéArrayAArrayBInverse[j11][j12] >= lambda) ||
          (crédibilitéArrayAArrayB[j11][j12] >= lambda &&
            crédibilitéArrayAArrayBInverse[j11][j12] >= lambda)
        ) {
          let chose = Number(classes) - j12;
          resultOptimisteArray.push("C" + chose);
          break;
        }
      }
      if (resultOptimisteArray[j11] === undefined) {
        resultOptimisteArray.push("C1");
      }
    }

    /*********** 
      Affichage des resultats de Optimiste
      dans le tableau
    *******/

    var optimist = document.getElementsByName("optimist");

    for (
      var j13Optimist = 0;
      j13Optimist < resultOptimisteArray.length;
      j13Optimist++
    ) {
      optimist[j13Optimist].value = resultOptimisteArray[j13Optimist];
    }
  }

  /**********
  Fonction qui ajoute
  les cellules ou on vas
  poser les résultats
  **********************/

  function criteriaAddForSolve(inputName) {
    var html = [
      <td>
        <input
          className="data-input"
          type="number"
          name={inputName}
          readOnly
        ></input>
      </td>,
      <td>
        <input
          className="data-input"
          type="number"
          name={inputName}
          readOnly
        ></input>
      </td>,
    ];
    for (var i = 3; i <= criteria; i++) {
      html.push(
        <td>
          <input
            className="data-input"
            type="number"
            name={inputName}
            readOnly
          ></input>
        </td>
      );
    }
    return html;
  }

  /**********
  Fonction pour la création des lignes
  des Tabelaux 2 et 3 (Concordonce & Discordance)
  c(a1,b3)...... &
  d(a1,b3)......
  **********************/

  function result(inputName, rowTitle) {
    var html = [];
    for (var j = Number(classes) + 1; j >= 1; j--) {
      for (var i = 1; i <= aletrantives; i++) {
        html.push(
          <tr>
            <td>
              {rowTitle}(a{i},b{j})
            </td>
            {criteriaAddForSolve(inputName)}
          </tr>
        );
      }
    }

    return html;
  }

  /**********
  Fonction pour la création des lignes
  des Tabelaux 2 et 3 (ConcordonceInverse & DiscordanceInverse)
  c(b3,a1)...... &
  d(b3,a1)......
  **********************/

  function resultInverse(inputName, rowTitle) {
    var html = [];
    for (var j = Number(classes) + 1; j >= 1; j--) {
      for (var i = 1; i <= aletrantives; i++) {
        html.push(
          <tr>
            <td>
              {rowTitle}(b{j},a{i})
            </td>
            {criteriaAddForSolve(inputName)}
          </tr>
        );
      }
    }

    return html;
  }

  /**********
  Fonction pour la création des lignes
  du Tabelau 4 Credibilité
  cr(a1,b3)...... 
  **********************/

  function credibilite() {
    var html = [];
    for (var j = Number(classes) + 1; j >= 1; j--) {
      for (var i = 1; i <= aletrantives; i++) {
        html.push(
          <tr>
            <td>
              cr(a{i},b{j})
            </td>
            <td>
              <input
                className="data-input"
                type="number"
                name="credibilite"
                readOnly
              ></input>
            </td>
          </tr>
        );
      }
    }

    return html;
  }

  /**********
  Fonction pour la création des lignes
  du Tabelau 4 Credibilité Inverse
  cr(b3,a1)...... 
  **********************/

  function credibiliteInverse() {
    var html = [];
    for (var j = Number(classes) + 1; j >= 1; j--) {
      for (var i = 1; i <= aletrantives; i++) {
        html.push(
          <tr>
            <td>
              cr(b{j},a{i})
            </td>
            <td>
              <input
                className="data-input"
                type="number"
                name="credibiliteInverse"
                readOnly
              ></input>
            </td>
          </tr>
        );
      }
    }

    return html;
  }

  /**********
  Fonctions pour la création des lignes
  des Tabelaux 2 Concordonce Globale
  **********************/

  function addLignes(inputName) {
    var html = [];

    for (var j = Number(classes) + 1; j >= 1; j--) {
      for (var i = 1; i <= aletrantives; i++) {
        html.push(
          <tr>
            <td>
              <input
                className="data-input"
                type="number"
                name={inputName}
                readOnly
              ></input>
            </td>
          </tr>
        );
      }
    }
    return html;
  }

  /**********
  Fonction pour la création des lignes
  du Tabelau 5 classification
  **********************/
  function classification() {
    var html = [];
    for (var i = 0; i < aletrantives; i++) {
      html.push(
        <tr>
          <td>a{i + 1}</td>
          <td>
            <input className="data-input" name="pessimist" readOnly></input>
          </td>
          <td>
            <input className="data-input" name="optimist" readOnly></input>
          </td>
        </tr>
      );
    }
    return html;
  }

  return (
    <div className="App">
      <h1>Electre Tri</h1>

      {/*********************
        Affichage des inputs
        classes Lambda 
        Alternatives Critéres
        **************************/}

      <br />
      <div className="body">
        <label htmlFor="Classes">Classes:</label>
        <input
          type="number"
          id="Classes"
          name="Classes"
          step="1"
          value={classes}
          onChange={(event) => setClasses(event.target.value)}
          min="2"
        ></input>
        <label htmlFor="Lambda">Lambda:</label>
        <input
          type="number"
          id="Lambda"
          name="Lambda"
          step="0.01"
          value={lambda}
          onChange={(event) => setLambda(event.target.value)}
          min="0.5"
          max="1"
        ></input>
        <label htmlFor="Aletrantives">Aletrantives:</label>
        <input
          type="number"
          id="Aletrantives"
          name="Aletrantives"
          step="1"
          value={aletrantives}
          onChange={(event) => setAletrantives(event.target.value)}
          min="2"
        ></input>
        <label htmlFor="Criteria">Critères:</label>
        <input
          type="number"
          id="Criteria"
          name="Criteria"
          step="1"
          value={criteria}
          onChange={(event) => setCriteria(event.target.value)}
          min="2"
        ></input>

        <br />
        <br />

        {/*********************
        Affichage du Tableau 1 a remplir 
        par l'utilisateur 
        **************************/}

        <table>
          <tbody>
            <tr>
              <td>Matrice</td>
              <td>g1</td>
              <td>g2</td>
              {criteriaAddTitles()}
            </tr>
            {classesAdd()}
            <tr>
              <td>b3</td>
              {criteriaAdd()}
            </tr>
            <tr>
              <td>b2</td>
              {criteriaAdd()}
            </tr>
            <tr>
              <td>b1</td>
              {criteriaAdd()}
            </tr>
            <tr>
              <td>Q</td>
              {criteriaAdd()}
            </tr>
            <tr>
              <td>P</td>
              {criteriaAdd()}
            </tr>
            <tr>
              <td>V</td>
              {criteriaAdd()}
            </tr>
            <tr>
              <td>W</td>
              {criteriaAdd()}
            </tr>
            <tr>
              <td>a1</td>
              {criteriaAdd()}
            </tr>
            <tr>
              <td>a2</td>
              {criteriaAdd()}
            </tr>
            {aletrantivesAdd()}
          </tbody>
        </table>

        <br />

        {/*********************
        Affichage du Button 
        Solution qui fait
        appel a lafunction resolve 
        **************************/}

        <button onClick={resolve}>Solution</button>

        <br />
        <br />

        <h2>Calcul Concordonce</h2>

        {/*********************
        Affichage du 
        Tableau 2 Concordonce 
        **************************/}

        <div className="tablemix">
          <table>
            <tbody>
              <tr>
                <td></td>
                <td>g1</td>
                <td>g2</td>
                {criteriaAddTitles()}
              </tr>
              {result("result[]", "c")}
            </tbody>
          </table>

          <table>
            <tbody>
              <tr>
                <td>C(a,b)</td>
              </tr>
              {addLignes("C")}
            </tbody>
          </table>
        </div>

        <div className="tablemix">
          <table>
            <tbody>
              <tr>
                <td></td>
                <td>g1</td>
                <td>g2</td>
                {criteriaAddTitles()}
              </tr>
              {resultInverse("resultInverse[]", "c")}
            </tbody>
          </table>

          <table>
            <tbody>
              <tr>
                <td>C(b,a)</td>
              </tr>
              {addLignes("C2")}
            </tbody>
          </table>
        </div>

        <br />

        <h2>Calcul Discordance</h2>

        {/*********************
        Affichage du 
        Tableau 3 Discordance 
        **************************/}

        <table>
          <tbody>
            <tr>
              <td></td>
              <td>g1</td>
              <td>g2</td>
              {criteriaAddTitles()}
            </tr>
            {result("result2[]", "d")}
          </tbody>
        </table>

        <table>
          <tbody>
            <tr>
              <td></td>
              <td>g1</td>
              <td>g2</td>
              {criteriaAddTitles()}
            </tr>
            {resultInverse("result2Inverse[]", "d")}
          </tbody>
        </table>

        <br />

        <h2>Calcul Credibilite</h2>

        {/*********************
        Affichage du 
        Tableau 4 Credibilite 
        **************************/}

        <div className="credibilite">
          <table>
            <tbody>
              <tr>
                <td></td>
                <td>(ai;bh)</td>
              </tr>
              {credibilite()}
            </tbody>
          </table>

          <table>
            <tbody>
              <tr>
                <td></td>
                <td>(bh;ai)</td>
              </tr>
              {credibiliteInverse()}
            </tbody>
          </table>
        </div>

        <br />

        <h2>Classification</h2>

        {/*********************
        Affichage du 
        Tableau 5 Classification 
        **************************/}

        <table>
          <tbody>
            <tr>
              <td>Alternatives</td>
              <td>Pessimist</td>
              <td>Optimist</td>
            </tr>
            {classification()}
          </tbody>
        </table>

        <br />
        <br />
        <br />
      </div>
    </div>
  );
}

export default App;
