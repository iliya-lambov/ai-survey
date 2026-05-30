// Google Apps Script — създава цялата анкета в Google Forms автоматично
// Как: Google Drive → New → More → Google Apps Script → сложи този код → Run

function createSurvey() {
  var form = FormApp.create('Студентски нагласи и умения в контекста на изкуствения интелект');
  form.setDescription('Пловдивски университет „Паисий Хилендарски"\nПедагогически факултет | Факултет по математика и информатика\nУчебна година 2025/2026 | Есенен семестър\n🟢 Анкетата е анонимна.');
  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);

  form.addTextItem().setTitle('Специалност').setRequired(true);
  form.addTextItem().setTitle('Курс').setRequired(true);

  form.addPageBreakItem().setTitle('📊 БЛОК А — Самооценка на уменията').setHelpText('Моля, оценете всяко твърдение по скала от 1 до 5.');

  var blockA = [
    'А1. Мога да обясня как работи езиков модел на базово ниво.',
    'А2. Мога да формулирам задача на ИИ инструмент така, че резултатът да е полезен без съществени корекции.',
    'А3. Мога да разпозная кога генериран резултат е грешен или непълен.',
    'А4. Мога да взема творческо решение и да го защитя с аргументи.',
    'А5. Знам каква е разликата между моето решение и това на ИИ при конкретна задача.'
  ];
  blockA.forEach(function(q) {
    form.addScaleItem().setTitle(q).setBounds(1, 5).setLabels('Изобщо не мога', 'Напълно мога').setRequired(true);
  });

  form.addPageBreakItem().setTitle('💭 БЛОК Б — Нагласи и убеждения').setHelpText('Изберете позицията си и напишете едно изречение защо.');

  var blockB = [
    'Б1. ИИ инструментите ще заменят голяма част от работата в моята специалност до 5 години.',
    'Б2. Уменията, които придобивам сега, ще са достатъчни след 10 години.',
    'Б3. Важно е да разбирам как работи даден инструмент, не само как да го използвам.',
    'Б4. Когато използвам ИИ за задача, крайният резултат е мой.',
    'Б5. Мога да разпозная кога нещо генерирано от ИИ е технически вярно, но погрешно по смисъл и намерение.'
  ];
  blockB.forEach(function(q) {
    var mc = form.addMultipleChoiceItem();
    mc.setTitle(q).setChoices([
      mc.createChoice('Съгласен/а'),
      mc.createChoice('Частично съгласен/а'),
      mc.createChoice('Не съгласен/а')
    ]).setRequired(true);
    form.addParagraphTextItem().setTitle(q + ' — Защо? (едно изречение)').setRequired(true);
  });

  form.addPageBreakItem().setTitle('👥 БЛОК В — Поведение при задачи').setHelpText('Може да се избере повече от един отговор.');

  var cb1 = form.addCheckboxItem();
  cb1.setTitle('В1. Когато получиш задача за самостоятелна работа, обикновено:').setChoices([
    cb1.createChoice('Започвам сам/а и после проверявам с ИИ'),
    cb1.createChoice('Питам първо ИИ и после адаптирам резултата'),
    cb1.createChoice('Питам ИИ и предавам с минимална редакция'),
    cb1.createChoice('Работя изцяло сам/а без ИИ инструменти'),
    cb1.createChoice('Зависи от задачата — имам различен подход за различни типове')
  ]);

  var cb2 = form.addCheckboxItem();
  cb2.setTitle('В2. Когато работиш в група:').setChoices([
    cb2.createChoice('Разпределяме задачите и всеки работи сам'),
    cb2.createChoice('Работим заедно на едно място'),
    cb2.createChoice('Един пита ИИ, останалите коментират и редактират'),
    cb2.createChoice('Нямаме ясен процес — всеки прави каквото може')
  ]);

  form.addPageBreakItem().setTitle('✍️ БЛОК Г — Отворени въпроси').setHelpText('Отговорът на всеки въпрос трябва да е минимум два пълни реда. Бъдете конкретни.');

  form.addParagraphTextItem().setTitle('Г1. Опиши конкретна ситуация, в която си взел/а решение по задача, което ИИ не би взел по същия начин. Какво беше различното?').setRequired(true);
  form.addParagraphTextItem().setTitle('Г2. Какво те прави тревожен/а по отношение на бъдещето в твоята специалност? Бъди конкретен/а — не „несигурността", а какво точно.').setRequired(true);
  form.addParagraphTextItem().setTitle('Г3. Какво би искал/а да умееш, което сега не умееш и което смяташ, че е важно за работата ти след дипломата?').setRequired(true);

  form.setConfirmationMessage('✅ Благодаря за отделеното време и честните отговори!\n\nИлия Ламбов | lambov.iliya@uni-plovdiv.bg');

  Logger.log('Формата е създадена: ' + form.getPublishedUrl());
  Logger.log('За отговори: ' + form.getEditUrl());
  return form.getPublishedUrl();
}
