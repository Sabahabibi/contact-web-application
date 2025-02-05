import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ContactList from "./card/contactList";
import ContactForm from "./form/contactForm";

export default function HomeComponent() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);

  useEffect(() => {
    fetch("https://679f6a5424322f8329c39f31.mockapi.io/customer")
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .catch((err) => console.error("خطا در دریافت اطلاعات:", err));
  }, []);

  const addContact = (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
  };

  const handleDeleteContact = async (id) => {
    try {
      const response = await fetch(
        `https://679f6a5424322f8329c39f31.mockapi.io/customer/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setContacts((prevContacts) =>
          prevContacts.filter((contact) => contact.id !== id)
        );
        toast.warning("مخاطب با موفقیت حذف شد!");
      } else {
        toast.error("خطا در حذف مخاطب!");
      }
    } catch (error) {
      toast.error("مشکلی در حذف اطلاعات پیش آمد!");
    }
  };

  return (
    <div>
      <h1 className="bg-blue-900 shadow-2xl text-white p-7 text-center font-bold text-xl">
        وب اپلیکیشن مدیریت مخاطبین
      </h1>
      <div className="flex gap-1 ">
        <div className="flex-1 m-4 text-center">
          <ContactList
            contacts={contacts}
            onDelete={handleDeleteContact}
            onEdit={handleEditContact}
          />
        </div>

        <div className="flex-1 m-4 text-center">
          <ContactForm
            onAddContact={addContact}
            onUpdateContact={handleEditContact}
            editingContact={editingContact}
          />
        </div>
      </div>
    </div>
  );
}
