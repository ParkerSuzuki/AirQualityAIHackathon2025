// Survey questions for PersonalHealthForm

const questions = [
  {
    name: 'zipCode',
    label: 'What is your ZIP or postal code?',
    type: 'input',
    inputType: 'text',
    placeholder: 'ZIP or postal code',
    required: true,
  },
  {
    name: 'ageGroup',
    label: 'What is your age group?',
    type: 'radio',
    options: [
      { value: '0-4', label: '0–4 years' },
      { value: '5-17', label: '5–17 years' },
      { value: '18-64', label: '18–64 years' },
      { value: '65+', label: '65+ years' },
    ],
    required: true,
  },
  {
    name: 'hasLungCondition',
    label: 'Do you have asthma or any other chronic lung condition?',
    type: 'radio',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    required: true,
  },
  {
    name: 'outdoorsMoreThanTwoHours',
    label: 'Will you be outdoors for more than two hours?',
    type: 'radio',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    required: true,
  },
  {
    name: 'isPregnant',
    label: 'Are you pregnant?',
    type: 'radio',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    required: true,
  },
  {
    name: 'hasHeartCondition',
    label: 'Do you have heart disease, high blood pressure, or diabetes?',
    type: 'radio',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    required: true,
  },
  {
    name: 'activityIntensity',
    label: 'How intense will your outdoor activity be?',
    type: 'radio',
    options: [
      { value: 'light', label: 'Light (walking)' },
      { value: 'moderate', label: 'Moderate (jogging)' },
      { value: 'hard', label: 'Hard (intense workout)' },
    ],
    required: true,
  },
  {
    name: 'workSetting',
    label: 'What is your typical work setting?',
    type: 'radio',
    options: [
      { value: 'indoor-ac', label: 'Mostly indoor with A/C' },
      { value: 'indoor-windows', label: 'Indoor with open windows' },
      { value: 'outdoor', label: 'Mostly outdoor' },
    ],
    required: true,
  },
  {
    name: 'smokesOrVapes',
    label: 'Do you smoke or vape?',
    type: 'radio',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    required: true,
  },
  {
    name: 'hasAirPurifier',
    label: 'Do you have an air purifier you can run?',
    type: 'radio',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    required: true,
  }
];

export default questions;
