export type SiteAgenticLocale = 'ru' | 'kk' | 'en';

const copies = {
	ru: {
		nav: {
			openMenu: 'Открыть навигационное меню',
			languageMenu: 'Выбрать язык сайта',
			themeToggle: 'Переключить тему оформления',
			switchLanguage: {
				ru: 'Переключить сайт на русский язык',
				kk: 'Переключить сайт на казахский язык',
				en: 'Переключить сайт на английский язык'
			}
		},
		social: {
			instagram: 'Instagram ИП Хватьев: примеры ремонта трансформаторов',
			whatsapp: 'WhatsApp ИП Хватьев: написать по ремонту трансформатора'
		},
		questionTool: {
			description:
				'Заполняет форму вопроса о ремонте, диагностике, монтаже или испытаниях трансформатора. После заполнения пользователь вручную проверяет и отправляет форму.',
			name: 'Имя человека или название организации, которая задаёт вопрос.',
			email: 'Email для обратной связи по вопросу.',
			message: 'Вопрос, описание оборудования или ситуации с трансформатором.'
		},
		leadTool: {
			description:
				'Заполняет заявку на предварительную оценку ремонта, диагностики, монтажа или испытаний силового трансформатора. После заполнения пользователь вручную проверяет и отправляет форму.',
			name: 'Имя контактного лица или название организации.',
			contact: 'Телефон, WhatsApp или email для связи.',
			capacity: 'Мощность трансформатора, если известна, например 630 кВА.',
			voltage: 'Класс или схема напряжения, если известны, например 10/0,4 кВ.',
			fault:
				'Описание неисправности, признаков, обстоятельств отключения или требуемого вида работ.',
			photo: 'Фото шильдика или повреждения трансформатора, если доступно.'
		}
	},
	kk: {
		nav: {
			openMenu: 'Навигация мәзірін ашу',
			languageMenu: 'Сайт тілін таңдау',
			themeToggle: 'Тақырыпты ауыстыру',
			switchLanguage: {
				ru: 'Сайтты орыс тіліне ауыстыру',
				kk: 'Сайтты қазақ тіліне ауыстыру',
				en: 'Сайтты ағылшын тіліне ауыстыру'
			}
		},
		social: {
			instagram: 'ИП Хватьев Instagram: трансформатор жөндеу жұмыстарының мысалдары',
			whatsapp: 'ИП Хватьев WhatsApp: трансформатор жөндеу туралы жазу'
		},
		questionTool: {
			description:
				'Трансформаторды жөндеу, диагностикалау, монтаждау немесе сынау туралы сұрақ формасын толтырады. Толтырғаннан кейін пайдаланушы форманы өзі тексеріп жібереді.',
			name: 'Сұрақ қоятын адамның аты немесе ұйым атауы.',
			email: 'Жауап беру үшін email.',
			message: 'Трансформаторға қатысты сұрақ, жабдық немесе жағдай сипаттамасы.'
		},
		leadTool: {
			description:
				'Күштік трансформаторды жөндеу, диагностикалау, монтаждау немесе сынау бойынша алдын ала бағалау өтінімін толтырады. Толтырғаннан кейін пайдаланушы форманы өзі тексеріп жібереді.',
			name: 'Байланыс адамының аты немесе ұйым атауы.',
			contact: 'Байланыс үшін телефон, WhatsApp немесе email.',
			capacity: 'Белгілі болса, трансформатор қуаты, мысалы 630 кВА.',
			voltage: 'Белгілі болса, кернеу класы немесе схемасы, мысалы 10/0,4 кВ.',
			fault: 'Ақаудың белгілері, ажыратылу жағдайы немесе қажет жұмыс түрінің сипаттамасы.',
			photo: 'Бар болса, трансформатор шильдигінің немесе зақымданудың фотосы.'
		}
	},
	en: {
		nav: {
			openMenu: 'Open navigation menu',
			languageMenu: 'Choose site language',
			themeToggle: 'Toggle color theme',
			switchLanguage: {
				ru: 'Switch the site to Russian',
				kk: 'Switch the site to Kazakh',
				en: 'Switch the site to English'
			}
		},
		social: {
			instagram: 'IP Khvatyev Instagram: transformer repair work examples',
			whatsapp: 'IP Khvatyev WhatsApp: message about transformer repair'
		},
		questionTool: {
			description:
				'Fills in a question form about transformer repair, diagnostics, installation or testing. After the fields are filled, the user reviews and submits the form manually.',
			name: 'Name of the person or organization asking the question.',
			email: 'Email address for a reply.',
			message: 'Question, equipment details or transformer situation description.'
		},
		leadTool: {
			description:
				'Fills in a request for a preliminary estimate for power transformer repair, diagnostics, installation or testing. After the fields are filled, the user reviews and submits the form manually.',
			name: 'Contact person name or organization name.',
			contact: 'Phone, WhatsApp or email for follow-up.',
			capacity: 'Transformer capacity if known, for example 630 kVA.',
			voltage: 'Voltage class or ratio if known, for example 10/0.4 kV.',
			fault: 'Fault symptoms, trip circumstances or requested scope of transformer work.',
			photo: 'Nameplate or damage photo, if available.'
		}
	}
} as const;

export const getAgenticCopy = (locale: string) =>
	copies[(locale in copies ? locale : 'ru') as SiteAgenticLocale];
