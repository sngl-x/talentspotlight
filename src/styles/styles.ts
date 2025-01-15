const styles = {
  centeredContainer: `
    flex
    flex-col
    items-center
    justify-center
    min-h-screen
    p-6
    bg-gray-50
  `,
  title: `
    text-3xl
    font-bold
    text-gray-900
    mb-8
    text-center
  `,
  languageSelectorContainer: `
    flex
    items-center
    mb-6
    space-x-4
  `,
  languageSelectorLabel: `
    text-lg
    font-medium
    text-gray-700
  `,
  languageSelector: `
    px-4
    py-2
    bg-white
    border
    border-gray-300
    rounded-lg
    shadow-sm
    focus:outline-none
    hover:border-gray-400
    text-gray-800
    cursor-pointer
  `,
  questionContainer: `
    flex
    flex-col
    items-center
    justify-center
    w-full
    max-w-4xl
    p-6
    bg-white
    rounded-lg
    shadow-md
  `,
  questionRow: `
    flex
    items-center
    justify-between
    w-full
  `,
  questionText: `
    text-lg
    font-medium
    text-gray-700
    mb-4
  `,
  textRight: `
    text-right
    w-1/3
  `,
  textLeft: `
    text-left
    w-1/3
  `,
  responseCircleContainer: `
    flex
    items-center
    justify-center
    space-x-4
    w-1/3
  `,
  circle: `
    w-10
    h-10
    rounded-full
    border
    border-gray-300
    hover:bg-gray-100
    focus:outline-none
    transition-all
    duration-150
    flex
    items-center
    justify-center
  `,
  circleActive: `
    bg-[#007A78]
    text-white
    border-[#005F5E]
  `,
  circleInactive: `
    bg-gray-200
    border-gray-300
  `,
};

export default styles;
