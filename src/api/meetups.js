/** URL адрес API */
export const API_URL = "http://localhost:8080";

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
export function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

/**
 * Получает список митапов с API
 * @return {Promise}
 */
export async function fetchMeetups() {
  return fetch(`${API_URL}/meetups`).then(res => res.json());
}

/**
 * Получает данные митапа с API
 * @return {Promise}
 */
export async function fetchMeetup(id) {
  return fetch(`${API_URL}/meetups/${id}`).then((res) => res.json());
}

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
export const agendaItemTitles = {
  registration: 'Реєстрація',
  opening: 'Відкриття',
  break: 'Перерва',
  coffee: 'Coffee Break',
  closing: 'Закриття',
  afterparty: 'Afterparty',
  talk: 'Виступ',
  other: 'Інші',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
export const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};