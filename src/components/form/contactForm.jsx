import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "./input/inputField";

const emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const phoneRegex = /^(\+98|0)?9\d{9}$/;

const nameRegex = /^[a-zA-Zآ-ی]+$/;

const ContactForm = ({ onAddContact, onUpdateContact, editingContact }) => {
  const [contacts, setContacts] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    relation: "",
    email: "",
  });

  useEffect(() => {
    if (editingContact) {
      setFormData({
        firstName: editingContact.firstName,
        lastName: editingContact.lastName,
        phone: editingContact.phone,
        relation: editingContact.relation,
        email: editingContact.email,
      });
    }
  }, [editingContact]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(
          "https://679f6a5424322f8329c39f31.mockapi.io/customer"
        );
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        toast.error("مشکلی در دریافت اطلاعات از سرور پیش آمد!");
      }
    };
    fetchContacts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (editingContact) {
      if (
        formData.firstName.trim() !== editingContact.firstName &&
        !formData.firstName.trim()
      ) {
        newErrors.firstName = "نام را وارد کنید";
      } else if (
        formData.firstName.trim() !== editingContact.firstName &&
        !nameRegex.test(formData.firstName)
      ) {
        newErrors.firstName = "نام فقط باید حروف باشد";
      }

      if (
        formData.lastName.trim() !== editingContact.lastName &&
        !formData.lastName.trim()
      ) {
        newErrors.lastName = "نام خانوادگی را وارد کنید";
      } else if (
        formData.lastName.trim() !== editingContact.lastName &&
        !nameRegex.test(formData.lastName)
      ) {
        newErrors.lastName = "نام خانوادگی فقط باید حروف باشد";
      }

      if (
        formData.phone.trim() !== editingContact.phone &&
        !formData.phone.trim()
      ) {
        newErrors.phone = "شماره موبایل را وارد کنید";
      } else if (
        formData.phone.trim() !== editingContact.phone &&
        !phoneRegex.test(formData.phone)
      ) {
        newErrors.phone = "فرمت شماره موبایل صحیح نیست";
      }

      if (
        formData.email.trim() !== editingContact.email &&
        !formData.email.trim()
      ) {
        newErrors.email = "ایمیل را وارد کنید";
      } else if (
        formData.email.trim() !== editingContact.email &&
        !emailRegex.test(formData.email)
      ) {
        newErrors.email = "فرمت ایمیل صحیح نیست";
      }

      if (
        formData.relation.trim() !== editingContact.relation &&
        !formData.relation.trim()
      ) {
        newErrors.relation = "نسبت را وارد کنید";
      }
    } else {
      if (!formData.firstName.trim()) {
        newErrors.firstName = "نام را وارد کنید";
      } else if (!nameRegex.test(formData.firstName)) {
        newErrors.firstName = "نام فقط باید حروف باشد";
      }

      if (!formData.lastName.trim()) {
        newErrors.lastName = "نام خانوادگی را وارد کنید";
      } else if (!nameRegex.test(formData.lastName)) {
        newErrors.lastName = "نام خانوادگی فقط باید حروف باشد";
      }

      if (!formData.phone.trim()) {
        newErrors.phone = "شماره موبایل را وارد کنید";
      } else if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = "فرمت شماره موبایل صحیح نیست";
      }

      if (!formData.email.trim()) {
        newErrors.email = "ایمیل را وارد کنید";
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = "فرمت ایمیل صحیح نیست";
      }

      if (!formData.relation.trim()) {
        newErrors.relation = "نسبت را وارد کنید";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const isDuplicate = contacts.some(
      (contact) =>
        contact.firstName.toLowerCase() === formData.firstName.toLowerCase() &&
        contact.lastName.toLowerCase() === formData.lastName.toLowerCase()
    );

    const existingContact = contacts.find(
      (contact) =>
        contact.email === formData.email || contact.phone === formData.phone
    );
    if (existingContact) {
      toast.error(
        `این ${
          existingContact.email === formData.email ? "ایمیل" : "شماره"
        } قبلاً برای ${existingContact.firstName} ${
          existingContact.lastName
        } ثبت شده است!`
      );
      return;
    }

    if (isDuplicate) {
      toast.error("این نام و نام خانوادگی قبلاً ثبت شده است!");
      return;
    }

    try {
      if (editingContact) {
        const response = await fetch(
          `https://679f6a5424322f8329c39f31.mockapi.io/customer/${editingContact.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          const updatedContact = await response.json();
          setContacts((prevContacts) =>
            prevContacts.map((contact) =>
              contact.id === updatedContact.id ? updatedContact : contact
            )
          );
          onUpdateContact(updatedContact);
          toast.success("مخاطب با موفقیت ویرایش شد!");
          setFormData({
            firstName: "",
            lastName: "",
            phone: "",
            relation: "",
            email: "",
          });
          setErrors({});
        } else {
          toast.error("خطا در ویرایش اطلاعات مخاطب!");
        }
      } else {
        const response = await fetch(
          "https://679f6a5424322f8329c39f31.mockapi.io/customer",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          const newContact = await response.json();
          setContacts([...contacts, newContact]);
          onAddContact(newContact);
          toast.success("مخاطب با موفقیت اضافه شد!");
          setFormData({
            firstName: "",
            lastName: "",
            phone: "",
            relation: "",
            email: "",
          });
          setErrors({});
        } else {
          toast.error("خطا در ارسال اطلاعات به سرور!");
        }
      }
    } catch (error) {
      toast.error("مشکلی در ارسال درخواست پیش آمد!");
    }
  };

  return (
    <div>
      <h4 className="font-semibold text-lg mb-6">
        {" "}
        {editingContact ? "ویرایش مخاطب" : "اضافه کردن مخاطب"}
      </h4>
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded shadow-sm flex flex-col"
      >
        <InputField
          label=":نام"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="... نام"
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm text-right pr-2">
            {errors.firstName}
          </p>
        )}

        <InputField
          label=":نام خانوادگی"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="... نام خانوادگی"
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm text-right pr-2">
            {errors.lastName}
          </p>
        )}

        <InputField
          label=":شماره موبایل"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="... شماره موبایل"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm text-right pr-2">{errors.phone}</p>
        )}

        <InputField
          label=":نسبت"
          type="text"
          name="relation"
          value={formData.relation}
          onChange={handleChange}
          placeholder="... نسبت"
        />
        {errors.relation && (
          <p className="text-red-500 text-sm text-right pr-2">
            {errors.relation}
          </p>
        )}

        <InputField
          label=":ایمیل"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="... ایمیل"
        />
        {errors.email && (
          <p className="text-red-500 text-sm text-right pr-2">{errors.email}</p>
        )}

        <button
          type="submit"
          className="p-2 mt-4 bg-gray-600 text-white rounded font-semibold text-sm ml-auto transform transition-transform duration-200 ease-in-out active:scale-105 hover:scale-100"
        >
          {editingContact ? "ویرایش" : "اضافه کردن"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
