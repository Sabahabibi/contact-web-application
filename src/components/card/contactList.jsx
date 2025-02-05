export default function ContactList({ contacts, onDelete, onEdit }) {
  console.log("onDelete:", onDelete);
  return (
    <div className="">
      <h4 className="text-lg font-semibold mb-6">لیست مخاطبین</h4>
      <div className="p-1 border rounded-lg shadow bg-slate-200">
        {contacts.length === 0 ? (
          <p className="font-bold text-md p-5 ">"هنوز مخاطبی اضافه نشده" </p>
        ) : (
          <ul className="grid grid-cols-2 ">
            {contacts.map((contact) => (
              <div key={contact.id} className="p-2">
                <div className="bg-gray-100 p-5 text-right grid-cols-2 rounded-lg">
                  <h5>
                    <span className="font-bold">نام :</span> {contact.firstName}{" "}
                    {contact.lastName}
                  </h5>
                  <h5>
                    <span className="font-bold">شماره موبایل :</span>{" "}
                    {contact.phone}
                  </h5>
                  <h5>
                    <span className="font-bold">نسبت :</span> {contact.relation}
                  </h5>
                  <h5>
                    {" "}
                    {contact.email} <span className="font-bold">: ایمیل </span>
                  </h5>
                  <div className="flex gap-2 justify-center mt-4">
                    <button
                      onClick={() => {
                        console.log("در حال حذف مخاطب با id:", contact.id);
                        onDelete(contact.id);
                      }}
                      className="bg-red-600 px-3 py-1 text-white rounded-md transform transition-transform duration-200 ease-in-out active:scale-105 hover:scale-100"
                    >
                      حذف
                    </button>
                    <button
                      onClick={() => onEdit(contact)}
                      className="bg-blue-800 px-3 py-1 text-white rounded-md transform transition-transform duration-200 ease-in-out active:scale-105 hover:scale-100"
                    >
                      ویرایش
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
