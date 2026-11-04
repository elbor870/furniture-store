const furniture = [
{id:1,title:'Диван Sora',category:'Гостиная',price:148900,rating:4.9,stock:8,description:'Модульный диван с глубоким сиденьем и выразительной фактурой ткани.',thumbnail:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85'},
{id:2,title:'Кресло Noma',category:'Гостиная',price:62900,rating:4.8,stock:12,description:'Кресло с округлой спинкой, мягкой посадкой и деревянными опорами.',thumbnail:'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85'},
{id:3,title:'Стол Audo',category:'Столовая',price:87900,rating:4.9,stock:6,description:'Обеденный стол из натурального дерева с чистой геометрией.',thumbnail:'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=85'},
{id:4,title:'Комод Linea',category:'Спальня',price:73900,rating:4.7,stock:9,description:'Комод с чистыми фасадами и деликатной фурнитурой.',thumbnail:'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=85'},
{id:5,title:'Торшер Arc',category:'Освещение',price:28900,rating:4.8,stock:14,description:'Скульптурный торшер с мягким рассеянным светом.',thumbnail:'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85'},
{id:6,title:'Кровать Haven',category:'Спальня',price:169000,rating:5,stock:4,description:'Кровать с мягким изголовьем и спокойными пропорциями.',thumbnail:'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85'},
{id:7,title:'Зеркало Aura',category:'Декор',price:21900,rating:4.7,stock:18,description:'Зеркало органичной формы в тонкой раме.',thumbnail:'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85'},
{id:8,title:'Столик Pebble',category:'Гостиная',price:31900,rating:4.8,stock:11,description:'Журнальный столик с мягкими линиями и фактурой дерева.',thumbnail:'https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&w=1200&q=85'},
{id:9,title:'Подвес Halo',category:'Освещение',price:17900,rating:4.6,stock:20,description:'Минималистичный подвес с тёплым светом.',thumbnail:'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85'},
{id:10,title:'Тумба bedside',category:'Спальня',price:24900,rating:4.6,stock:13,description:'Компактная прикроватная тумба с вместительным ящиком.',thumbnail:'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=85'},
{id:11,title:'Ваза Terra',category:'Декор',price:6900,rating:4.9,stock:25,description:'Керамическая ваза с матовой поверхностью.',thumbnail:'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=1200&q=85'},
{id:12,title:'Стул Atelier',category:'Столовая',price:18900,rating:4.7,stock:16,description:'Стул с деревянным каркасом и мягким сиденьем.',thumbnail:'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=85'}
];
export const productsApi = {
 getAll: async ({limit=12,skip=0,q='',category='',sortBy='',order='asc'}={}) => { let list=[...furniture]; if(q) list=list.filter(p=>(p.title+' '+p.category).toLowerCase().includes(q.toLowerCase())); if(category) list=list.filter(p=>p.category===category); if(sortBy) list.sort((a,b)=>(a[sortBy]-b[sortBy])*(order==='desc'?-1:1)); return {products:list.slice(skip,skip+limit),total:list.length,skip,limit}; },
 getById: async (id) => furniture.find(p=>p.id===Number(id))||null,
 getCategories: async () => [...new Set(furniture.map(p=>p.category))],
 getFeatured: async () => furniture.slice(0,4),
};
export const ordersApi = {getAll:async()=>({carts:[]}),getByUser:async()=>({carts:[]}),create:async(payload)=>payload};
export const usersApi = {login:async(username)=>({username}),register:async(payload)=>payload};
