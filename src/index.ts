//#region component imports
import C_AvatarUploader from './components/AvatarUploader'
import C_Button from './components/Button'
import C_CollapsiblePanel from './components/CollapsiblePanel'
import C_ContextMenu from './components/ContextMenu'
import C_Counter from './components/Counter'
import C_DataGrid from './components/DataGrid'
import C_DragDropAssignment from './components/DragDropAssignment'
import C_Dropdown from './components/Dropdown'
import C_EditableLabel from './components/EditableLabel'
import C_FailedToLoadError from './components/FailedToLoadError'
import C_FileFormUpload from './components/FileFormUpload'
import C_FilePreview from './components/FilePreview'
import C_FileViewer from './components/FileViewer/FileViewer'
import C_FileViewerWindow from './components/FileViewer/FileViewerWindow'
import C_SingleFileComponent from './components/FileViewer/SingleFileComponent'
import C_AutoForm from './components/Form/AutoForm'
import C_ColorPicker from './components/Form/ColorPicker'
import C_SingleDatePicker from './components/Form/SingleDatePicker'
import C_DateRange from './components/Form/DateRange'
import C_FilenameField from './components/Form/FilenameField'
import C_HtmlPreview from './components/HtmlPreview'
import C_CenteredImage from './components/Image/CenteredImage'
import C_ImageLightbox from './components/Image/ImageLightbox'
import C_ImageLoader from './components/Image/ImageLoader'
import C_Input from './components/Input'
import C_KeyValueGroup from './components/KeyValueGroup'
import C_LazyDropdown from './components/LazyDropdown'
import C_LoadingMask from './components/LoadingMask'
import C_NoRecordsToDisplay from './components/NoRecordsToDisplay'
import C_PageBar from './components/PageBar'
import C_PdfViewerWindow from './components/PdfViewerWindow'
import C_ActionNotification from './components/Popups/ActionNotification'
import C_Alert from './components/Popups/Alert'
import C_Confirm from './components/Popups/Confirm'
import C_LoadingModal from './components/Popups/LoadingModal'
import C_Overlay from './components/Popups/Overlay'
import C_TextAreaModal from './components/Popups/TextAreaModal'
import C_PopoverButton from './components/Popups/PopoverButton'
import C_PushNotification from './components/PushNotification'
import C_RecordsSummary from './components/RecordsSummary'
import C_RichTextEditor from './components/RichTextEditor'
import C_SearchBar from './components/SearchBar'
import C_SearchDrawer from './components/SearchDrawer'
import C_Slider from './components/Slider'
import C_SplitButton from './components/SplitButton'
import C_Box from './components/Styled/Box'
import C_FlexContainer from './components/Styled/FlexContainer'
import C_Swatch from './components/Styled/Swatch'
import C_DrawerArea from './components/Styled/DrawerArea'
import C_SummaryValue from './components/SummaryValue'
import C_TextArea from './components/TextArea'
import C_TileMenu from './components/TileMenu'
import C_UploadButton from './components/UploadButton'
import C_Uploader from './components/Uploader'
import C_ViewFileWindow from './components/ViewFileWindow'
import C_TextViewer from './components/ViewFileWindow/components/TextViewer'
import C_NavigationBar from './components/NavigationBar'
import C_MainNavigation from './components/MainNavigation'
import C_SVGLogo from './components/SVGLogo'
import C_MaintenanceGrid from './components/Maintenance/MaintenanceGrid'
//#endregion

//#region scene imports
import SC_LoginScene from './scenes/Login'
import SC_AuthScene from './scenes/AuthScene'
import SC_FullScreenScene from './scenes/FullScreenScene'
//#endregion

//#region hook imports
import H_useCallOnEnterUp from './hooks/useCallOnEnterUp'
import H_useCallOnEscapeUp from './hooks/useCallOnEscapeUp'
import H_useCallOnKeyUp from './hooks/useCallOnKeyUp'
import H_useCallOnKeyPress from './hooks/useCallOnKeyPress'
import H_useCallOnKeyDown from './hooks/useCallOnKeyDown'
import H_useIsKeyDown from './hooks/useIsKeyDown'
import H_useDebouncedCallback from './hooks/useDebouncedCallback'
import H_useDelayedFunction from './hooks/useDelayedFunction'
import H_useRecordSelection from './hooks/useRecordSelection'
import H_useTheme from './hooks/useTheme'
import { useContextMenu as H_useContextMenu } from 'react-contexify'
import { useActionNotification as H_useActionNotification } from './providers/ActionNotificationProvider'
//#endregion

//#region service imports
import * as S_FormatColumnService from './services/FormatColumnService'
import * as S_SortService from './services/SortService'
//#endregion

//#region util imports
import * as U_date from './util/date'
import * as U_filename from './util/filename'
import * as U_format from './util/format'
import * as U_File from './util/file'
import * as U_contextMenu from './util/contextMenu'
//#endregion

//#region theme imports
import T_defaultTheme from './themes/defaultTheme'
//#endregion

//#region css imports
import 'react-contexify/dist/ReactContexify.css'
import 'react-image-crop/dist/ReactCrop.css'
//#endregion

//#region provider imports
import * as P_AppInfoProvider from './providers/AppInfoProvider'
import { ActionNotificationProvider as P_ActionNotificationProvider } from './providers/ActionNotificationProvider'
//#endregion

//#region component exports
export const AvatarUploader = C_AvatarUploader
export const Button = C_Button
export const CollapsiblePanel = C_CollapsiblePanel
export const ContextMenu = C_ContextMenu
export const Counter = C_Counter
export const DataGrid = C_DataGrid
export const DragDropAssignment = C_DragDropAssignment
export const Dropdown = C_Dropdown
export const EditableLabel = C_EditableLabel
export const FailedToLoadError = C_FailedToLoadError
export const FileFormUpload = C_FileFormUpload
export const FilePreview = C_FilePreview
export const FileViewer = C_FileViewer
export const FileViewerWindow = C_FileViewerWindow
export const SingleFileComponent = C_SingleFileComponent
export const AutoForm = C_AutoForm
export const ColorPicker = C_ColorPicker
export const DateRange = C_DateRange
export const SingleDatePicker = C_SingleDatePicker
export const FilenameField = C_FilenameField
export const HtmlPreview = C_HtmlPreview
export const CenteredImage = C_CenteredImage
export const ImageLightbox = C_ImageLightbox
export const ImageLoader = C_ImageLoader
export const Input = C_Input
export const KeyValueGroup = C_KeyValueGroup
export const LazyDropdown = C_LazyDropdown
export const LoadingMask = C_LoadingMask
export const NoRecordsToDisplay = C_NoRecordsToDisplay
export const PageBar = C_PageBar
export const PdfViewerWindow = C_PdfViewerWindow
export const ActionNotification = C_ActionNotification
export const Alert = C_Alert
export const Confirm = C_Confirm
export const LoadingModal = C_LoadingModal
export const Overlay = C_Overlay
export const TextAreaModal = C_TextAreaModal
export const PushNotification = C_PushNotification
export const RecordsSummary = C_RecordsSummary
export const RichTextEditor = C_RichTextEditor
export const SearchBar = C_SearchBar
export const SearchDrawer = C_SearchDrawer
export const Slider = C_Slider
export const SplitButton = C_SplitButton
export const Box = C_Box
export const FlexContainer = C_FlexContainer
export const Swatch = C_Swatch
export const DrawerArea = C_DrawerArea
export const SummaryValue = C_SummaryValue
export const TextArea = C_TextArea
export const TileMenu = C_TileMenu
export const Uploader = C_Uploader
export const UploadButton = C_UploadButton
export const ViewFileWindow = C_ViewFileWindow
export const TextViewer = C_TextViewer
export const PopoverButton = C_PopoverButton
export const NavigationBar = C_NavigationBar
export const MainNavigation = C_MainNavigation
export const SVGLogo = C_SVGLogo
export const MaintenanceGrid = C_MaintenanceGrid
//#endregion

//#region scene exports
export const LoginScene = SC_LoginScene
export const AuthScene = SC_AuthScene
export const FullScreenScene = SC_FullScreenScene
//#endregion

//#region hook exports
export const useCallOnEnterUp = H_useCallOnEnterUp
export const useCallOnEscapeUp = H_useCallOnEscapeUp
export const useCallOnKeyUp = H_useCallOnKeyUp
export const useCallOnKeyPress = H_useCallOnKeyPress
export const useCallOnKeyDown = H_useCallOnKeyDown
export const useIsKeyDown = H_useIsKeyDown
export const useRecordSelection = H_useRecordSelection
export const useTheme = H_useTheme
export const useDebouncedCallback = H_useDebouncedCallback
export const useDelayedFunction = H_useDelayedFunction
export const useContextMenu = H_useContextMenu
export const useActionNotification = H_useActionNotification
//#endregion

//#region service exports
export const FormatColumnService = S_FormatColumnService
export const SortService = S_SortService
//#endregion

//#region util exports
export const date = U_date
export const filename = U_filename
export const format = U_format
export const file = U_File
export const contextMenu = U_contextMenu

//#endregion

//#region theme exports
export const defaultTheme = T_defaultTheme
//#endregion

//#region provider exports
export const AppInfoProvider = P_AppInfoProvider.AppInfoProvider
export const ActionNotificationProvider = P_ActionNotificationProvider
//#endregion

//#region context exports
export const AppInfoContext = P_AppInfoProvider.AppInfoContext
//#endregion
