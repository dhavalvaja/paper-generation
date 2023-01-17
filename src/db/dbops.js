import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

export async function getSubjects(semester) {
  return await getDoc(doc(db, "IT", semester))
    .then((value) => {
      if (value.exists()) {
        if (value.data()["subject"] !== undefined) {
          // console.log({ subjects: value.data()["subject"] })
          return value.data()["subject"]
        }
      }
    })
    .catch((error) => {
      console.log(error);
    })
}


export async function getChapterDetails(semester, subject) {
  return await getDoc(doc(db, "IT", semester))
    .then((value) => {
      if (value.exists()) {
        if (value.data()[subject] !== undefined) {

          var chapters = Object.keys(value.data()[subject])
            .map((key) => {
              return {
                chapternumber: key,
                ...value.data()[subject][key]
              }
            }).filter(e => e.chapternumber !== "CO")
          // console.log({ chapters: chapters });
          return chapters
        }
      }
    })
    .catch((error) => {
      console.log(error);
    })
}

export async function getChapterId(semester, subject, chapter) {
  return await getChapterDetails(semester, subject).then((value) => {
    // console.log(value);
    var chapterId = value.filter(e => e.chapterName === chapter)[0].chapterId
    // console.log({ chapterId: chapterId });
    return chapterId
  })
}

export async function getCo(semester, subject) {
  return await getDoc(doc(db, "IT", semester))
    .then((value) => {
      if (value.exists()) {
        if (value.data()[subject] !== undefined) {
          if (value.data()[subject]["CO"] !== undefined) {
            const coList = Object.keys(value.data()[subject]["CO"]).map(key => {
              return {
                co: key,
                ...value.data()[subject]["CO"][key]
              }
            })
            // console.log({ coList: coList });
            return coList
          }
        }
      }
    })
    .catch((error) => {
      console.log(error);
    })
}

export async function getQuestionCount(semester, subject, chapter, type, co, skill) {
  const chapterId = await getChapterId(semester, subject, chapter)
  return await getDoc(doc(db, `IT/${semester}/${subject}`, chapterId))
    .then((value) => {
      if (value.exists()) {
        if (value.data()[type] && value.data()[type][co]) {
          // console.log({ count: value.data()[type][co][skill] });
          return value.data()[type][co][skill]
        }
      }
    })
}

export async function getBlueprints() {
  var blueprintList = []
  const blueprintRef = await getDocs(collection(db, "Blueprint"))
  blueprintRef.forEach((document) => {
    blueprintList.push(document.id)
  })
  console.log("get blueprint");
  return blueprintList
}

export async function generatePaper(blueprintname) {

  return await getDoc(doc(db, 'Blueprint', blueprintname))
    .then(async (value) => {

      if (value.exists()) {
        var paperObj = []

        var { semester, subject, questionList } = value.data()
        questionList = Object.values(questionList)

        for (const [index, que] of questionList.entries()) {
          for (const [i, subque] of que.entries()) {

            const { skill, type, chapter, co } = subque
            const chapterId = await getChapterId(semester, subject, chapter)

            // await getDoc(doc(db, `IT/${semester}/${subject}/${chapterId}/questions`, type))
            //   .then((value) => {

            //     if (value.exists()) {

            //       const { [co]: CO } = value.data()
            //       const { [skill]: avalqueList } = CO
            //       const n = Math.floor((Math.random() * avalqueList.length))

            //       var temp = avalqueList[n]

            //       paperObj.push({ qno: `q${index + 1}${(i + 10).toString(36)}`, question: temp, type: type })
            //     }
            //   })
            const value = (await getDoc(doc(db, `IT/${semester}/${subject}/${chapterId}/questions`, type))).data()
            const { [co]: CO } = value
            const { [skill]: avalqueList } = CO
            const n = Math.floor((Math.random() * avalqueList.length))

            var temp = avalqueList[n]

            paperObj.push({ qno: `q${index + 1}${(i + 10).toString(36)}`, question: temp, type: type })
          }
        }
        return paperObj
      }
    })
}