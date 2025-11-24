import pipwerks from './scorm_piwark/SCORM_API_wrapper';

export const initializeSCORM = () => {
    pipwerks.SCORM.version = "1.2"; // or "2004" based on your SCORM version
    return pipwerks.SCORM.init();
};

export const terminateSCORM = () => {
    return pipwerks.SCORM.quit();
};

export const getLearnerDetails = () => {
    const studentId = pipwerks.SCORM.get("cmi.core.student_id"); // For SCORM 1.2
    const studentName = pipwerks.SCORM.get("cmi.core.student_name"); // For SCORM 1.2
    return { studentId, studentName };
};