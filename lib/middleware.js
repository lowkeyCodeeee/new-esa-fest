async function isExist(students, data) {
    const { fullName, house } = data;
    const userData = await students.findOne({ fullName, house });
    return userData ? { isExist: true, userData } : { isExist: false, userData: null };
}

export async function postData(db, query) {
    const students = db.collection("attendance");
    const { id, fullName, courseYear, house, backendDate } = query;
    const dateNow = new Date().toISOString().split("T")[0];

    const userStats = await isExist(students, query);

    if (userStats.isExist && dateNow !== userStats.userData.backendDate) {
        await students.updateOne(
            { fullName, house, studentId: id },
            { $inc: { noAttend: 1 }, $set: { backendDate: dateNow } }
        );
    } else if (userStats.isExist && dateNow === userStats.userData.backendDate) {
        await students.updateOne(
            { fullName, house, studentId: id },
            { $set: { noAttend: userStats.userData.noAttend } }
        );
    } else {
        await students.insertOne({ studentId: id, fullName, courseYear, house, backendDate, noAttend: 1 });
    }

    return { id, fullName, house };
}

export async function getStudent(db, info) {
    const students = db.collection("attendance");
    return await students.findOne({ fullName: info.fullName, house: info.house, studentId: info.id });
}

export async function getAllStudents(db) {
    const students = db.collection("attendance");
    return await students.find().toArray();
}
